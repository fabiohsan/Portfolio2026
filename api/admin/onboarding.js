import { ADMIN_COOKIE_NAME, parseCookies, verifyAdminSession } from '../_lib/adminAuth.js';
import { createSupabaseServerClient } from '../_lib/supabaseServer.js';
import { getContractTemplateMeta } from '../../lib/contractTemplate.js';

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
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
    const { data, error } = await supabase
      .from('onboarding_dados')
      .select(
        'cliente,email_relatorios,estado_civil,cpf_representante,comprovante_nota,registro_id,vista_user,vista_pass,c2s_token,wp_user,wp_pass,brand_link,benchmark_1,benchmark_2,benchmark_3,whatsapp_numero,cnpj,razao_social,creci,endereco,telefone,instagram,facebook,youtube,hosting_provider,hosting_url,hosting_user,hosting_pass,ftp_host,ftp_user,ftp_pass,registrobr_login,registrobr_pass,contrato_status,contrato_link,updated_at'
      )
      .order('updated_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return json(res, 200, {
      rows: data || [],
      contractTemplate: getContractTemplateMeta(),
    });
  } catch (error) {
    return json(res, 500, {
      error: error instanceof Error ? error.message : 'Nao foi possivel carregar os dados.',
    });
  }
}
