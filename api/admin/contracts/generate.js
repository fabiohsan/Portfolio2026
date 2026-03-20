import { ADMIN_COOKIE_NAME, parseCookies, verifyAdminSession } from '../../_lib/adminAuth.js';
import { createSupabaseServerClient } from '../../_lib/supabaseServer.js';
import { getContractMissingFields } from '../../../lib/contractModel.js';
import {
  getContractTemplateMeta,
  getGeneratedContractPath,
  renderContractPdf,
} from '../../../lib/contractTemplate.js';

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};

const readBody = async (req) => {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const STORAGE_BUCKET = 'onboarding';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  if (!verifyAdminSession(cookies[ADMIN_COOKIE_NAME])) {
    return json(res, 401, { error: 'Unauthorized.' });
  }

  try {
    const body = await readBody(req);
    const clientId = String(body?.client ?? '').trim();

    if (!clientId) {
      return json(res, 400, { error: 'Cliente nao informado.' });
    }

    const supabase = createSupabaseServerClient();
    const { data: row, error: rowError } = await supabase
      .from('onboarding_dados')
      .select(
        'cliente,email_relatorios,estado_civil,cpf_representante,cnpj,razao_social,creci,endereco,telefone,instagram,facebook,youtube,contrato_status,contrato_link,updated_at'
      )
      .eq('cliente', clientId)
      .maybeSingle();

    if (rowError) throw rowError;
    if (!row) {
      return json(res, 404, { error: 'Registro nao encontrado para este cliente.' });
    }

    const missingFields = getContractMissingFields(row);
    if (missingFields.length > 0) {
      return json(res, 422, {
        error: 'Ainda faltam campos obrigatorios para gerar o contrato.',
        missingFields,
      });
    }

    const now = new Date();
    const path = getGeneratedContractPath(row, now);
    const uploadPayload = await renderContractPdf(row, now);

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, uploadPayload, {
        upsert: false,
        contentType: 'application/pdf',
      });

    if (uploadError) throw uploadError;

    const { data: publicFile } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    const publicUrl = publicFile?.publicUrl;

    if (!publicUrl) {
      throw new Error('Nao foi possivel obter o link publico do contrato.');
    }

    const { error: persistError } = await supabase.rpc('upsert_onboarding_dados', {
      p_payload: {
        cliente: clientId,
        contrato_status: 'gerado',
        contrato_link: publicUrl,
        updated_at: now.toISOString(),
      },
    });

    if (persistError) throw persistError;

    return json(res, 200, {
      ok: true,
      contractLink: publicUrl,
      contractTemplate: getContractTemplateMeta(),
      missingFields: [],
    });
  } catch (error) {
    return json(res, 500, {
      error: error instanceof Error ? error.message : 'Nao foi possivel gerar o contrato.',
    });
  }
}
