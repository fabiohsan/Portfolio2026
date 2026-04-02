import { ADMIN_COOKIE_NAME, parseCookies, verifyAdminSession } from '../_lib/adminAuth.js';
import { createSupabaseServerClient } from '../_lib/supabaseServer.js';
import { getContractTemplateMeta } from '../../lib/contractTemplate.js';

const BASE_SELECT =
  'cliente,email_relatorios,estado_civil,cpf_representante,cnpj,razao_social,creci,endereco,telefone,instagram,facebook,youtube,contrato_status,contrato_link,updated_at';

const DETAIL_SELECT =
  'cliente,comprovante_nota,registro_id,vista_user,vista_pass,c2s_token,wp_user,wp_pass,brand_link,benchmark_1,benchmark_2,benchmark_3,whatsapp_numero,hosting_provider,hosting_url,hosting_user,hosting_pass,ftp_host,ftp_user,ftp_pass,registrobr_login,registrobr_pass';

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};

const formatSupabaseError = (error) => {
  if (!error) return 'Erro desconhecido.';

  const parts = [error.message, error.details, error.hint, error.code].filter(Boolean);
  return parts.join(' | ') || 'Erro desconhecido.';
};

const mergeOptionalFields = (rows, optionalRows) => {
  const rowsByClient = new Map(
    (optionalRows || [])
      .filter((row) => typeof row?.cliente === 'string' && row.cliente.trim().length > 0)
      .map((row) => [row.cliente.trim(), row])
  );

  return (rows || []).map((row) => {
    const clientId = typeof row?.cliente === 'string' ? row.cliente.trim() : '';
    const optional = clientId ? rowsByClient.get(clientId) : null;
    return optional ? { ...row, ...optional } : row;
  });
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  if (!verifyAdminSession(cookies[ADMIN_COOKIE_NAME])) {
    return json(res, 401, { error: 'Unauthorized.' });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data: baseRows, error: baseError } = await supabase
      .from('onboarding_dados')
      .select(BASE_SELECT)
      .order('updated_at', { ascending: false })
      .limit(100);

    if (baseError) throw baseError;

    const { data: detailRows, error: detailError } = await supabase
      .from('onboarding_dados')
      .select(DETAIL_SELECT)
      .order('updated_at', { ascending: false })
      .limit(100);

    const warning = detailError
      ? `Os campos adicionais do onboarding nao puderam ser carregados. ${formatSupabaseError(
          detailError
        )}`
      : '';

    return json(res, 200, {
      rows: mergeOptionalFields(baseRows, detailRows),
      contractTemplate: getContractTemplateMeta(),
      warning,
    });
  } catch (error) {
    return json(res, 500, {
      error:
        error instanceof Error
          ? error.message
          : formatSupabaseError(error) || 'Nao foi possivel carregar os dados.',
    });
  }
}
