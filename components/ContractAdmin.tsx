import React, { useEffect, useState } from 'react';
import { getContractMissingFields } from '../lib/contractModel.js';

const inputCls =
  'w-full bg-[#0d0d0d] border border-white/10 p-3 text-white text-sm focus:border-red-600 focus:outline-none transition-colors rounded-lg';

type OnboardingRow = {
  cliente: string | null;
  email_relatorios: string | null;
  estado_civil: string | null;
  cpf_representante: string | null;
  comprovante_nota: string | null;
  registro_id: string | null;
  vista_user: string | null;
  vista_pass: string | null;
  c2s_token: string | null;
  wp_user: string | null;
  wp_pass: string | null;
  brand_link: string | null;
  benchmark_1: string | null;
  benchmark_2: string | null;
  benchmark_3: string | null;
  whatsapp_numero: string | null;
  cnpj: string | null;
  razao_social: string | null;
  creci: string | null;
  endereco: string | null;
  telefone: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  hosting_provider: string | null;
  hosting_url: string | null;
  hosting_user: string | null;
  hosting_pass: string | null;
  ftp_host: string | null;
  ftp_user: string | null;
  ftp_pass: string | null;
  registrobr_login: string | null;
  registrobr_pass: string | null;
  contrato_status: string | null;
  contrato_link: string | null;
  updated_at: string | null;
};

type OnboardingFieldKey = keyof OnboardingRow;
type FieldKind = 'link' | 'secret';

type DetailField = {
  key: OnboardingFieldKey;
  label: string;
  kind?: FieldKind;
};

type DetailSection = {
  title: string;
  fields: DetailField[];
};

type ContractTemplateMeta = {
  id: string;
  name: string;
  requiredFields: string[];
};

type AdminResponse = {
  rows?: OnboardingRow[];
  contractTemplate?: ContractTemplateMeta;
  warning?: string;
  error?: string;
};

type GenerateContractResponse = {
  contractLink?: string;
  contractTemplate?: ContractTemplateMeta;
  missingFields?: string[];
  error?: string;
};

const formatDate = (value: string | null) => {
  if (!value) return 'Sem atualizacao';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};

const getMissingFields = (row: OnboardingRow) => getContractMissingFields(row);

const getStatusLabel = (status: string | null) => {
  switch (status) {
    case 'assinado':
      return 'Assinado';
    case 'aguardando_assinatura':
      return 'Aguardando assinatura';
    case 'gerado':
      return 'Contrato gerado';
    default:
      return 'Sem status';
  }
};

const getStatusClasses = (status: string | null) => {
  switch (status) {
    case 'assinado':
      return 'bg-green-500/15 text-green-300 border-green-500/20';
    case 'aguardando_assinatura':
      return 'bg-amber-500/15 text-amber-200 border-amber-500/20';
    case 'gerado':
      return 'bg-blue-500/15 text-blue-200 border-blue-500/20';
    default:
      return 'bg-white/5 text-gray-300 border-white/10';
  }
};

const isFilled = (value: string | null | undefined) => String(value ?? '').trim().length > 0;

const detailSections: DetailSection[] = [
  {
    title: 'Contato e canais',
    fields: [
      { key: 'endereco', label: 'Endereco do escritorio' },
      { key: 'telefone', label: 'Telefone' },
      { key: 'instagram', label: 'Instagram', kind: 'link' },
      { key: 'facebook', label: 'Facebook', kind: 'link' },
      { key: 'youtube', label: 'YouTube', kind: 'link' },
      { key: 'whatsapp_numero', label: 'WhatsApp / disponibilidade' },
    ],
  },
  {
    title: 'Documentos e referencias',
    fields: [
      { key: 'comprovante_nota', label: 'Comprovante do sinal', kind: 'link' },
      { key: 'brand_link', label: 'Manual / pasta da marca', kind: 'link' },
      { key: 'benchmark_1', label: 'Benchmark 1', kind: 'link' },
      { key: 'benchmark_2', label: 'Benchmark 2', kind: 'link' },
      { key: 'benchmark_3', label: 'Benchmark 3', kind: 'link' },
    ],
  },
  {
    title: 'Acessos tecnicos',
    fields: [
      { key: 'registro_id', label: 'ID ou e-mail no Registro.br' },
      { key: 'vista_user', label: 'Usuario VISTA' },
      { key: 'vista_pass', label: 'Senha VISTA', kind: 'secret' },
      { key: 'c2s_token', label: 'Token C2S', kind: 'secret' },
      { key: 'wp_user', label: 'Usuario WordPress' },
      { key: 'wp_pass', label: 'Senha WordPress', kind: 'secret' },
      { key: 'registrobr_login', label: 'Login Registro.br' },
      { key: 'registrobr_pass', label: 'Senha Registro.br', kind: 'secret' },
    ],
  },
  {
    title: 'Hospedagem e FTP',
    fields: [
      { key: 'hosting_provider', label: 'Provedor' },
      { key: 'hosting_url', label: 'URL do painel', kind: 'link' },
      { key: 'hosting_user', label: 'Usuario do painel' },
      { key: 'hosting_pass', label: 'Senha do painel', kind: 'secret' },
      { key: 'ftp_host', label: 'FTP host' },
      { key: 'ftp_user', label: 'FTP usuario' },
      { key: 'ftp_pass', label: 'FTP senha', kind: 'secret' },
    ],
  },
];

const getFieldHref = (value: string) => {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return null;
};

const canExposeContractLink = (row: OnboardingRow, missingFields: string[]) => {
  if (!row.contrato_link?.trim()) return false;
  if (missingFields.length === 0) return true;

  return ['gerado', 'aguardando_assinatura', 'assinado'].includes(row.contrato_status || '');
};

export const ContractAdmin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [rows, setRows] = useState<OnboardingRow[]>([]);
  const [contractTemplate, setContractTemplate] = useState<ContractTemplateMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [busyClient, setBusyClient] = useState<string | null>(null);

  const loadRows = async (options?: { silentAuth?: boolean }) => {
    setLoading(true);
    if (!options?.silentAuth) setErrorMsg('');
    if (!options?.silentAuth) setWarningMsg('');

    try {
      const response = await fetch('/api/admin/onboarding', {
        credentials: 'same-origin',
      });

      if (response.status === 401) {
        setUnlocked(false);
        setWarningMsg('');
        if (!options?.silentAuth) {
          setErrorMsg('Sessao expirada. Entre novamente.');
        }
        return;
      }

      const payload = (await response.json()) as AdminResponse;
      if (!response.ok) throw new Error(payload.error || 'Nao foi possivel carregar os dados.');

      setRows(payload.rows ?? []);
      setContractTemplate(payload.contractTemplate ?? null);
      setWarningMsg(payload.warning ?? '');
      setUnlocked(true);
      setLastSync(new Date().toISOString());
    } catch (err: unknown) {
      if (!options?.silentAuth) {
        setErrorMsg(err instanceof Error ? err.message : 'Nao foi possivel carregar os dados.');
      }
    } finally {
      setLoading(false);
      setCheckingSession(false);
    }
  };

  const handleGenerateContract = async (row: OnboardingRow) => {
    const clientId = row.cliente?.trim();

    if (!clientId) {
      setErrorMsg('Este registro nao possui identificacao de cliente para gerar o contrato.');
      return;
    }

    setBusyClient(clientId);
    setErrorMsg('');
    setActionMsg('');

    try {
      const response = await fetch('/api/admin/contracts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ client: clientId }),
      });

      if (response.status === 401) {
        setUnlocked(false);
        setRows([]);
        setLastSync(null);
        setContractTemplate(null);
        setWarningMsg('');
        throw new Error('Sessao expirada. Entre novamente.');
      }

      const payload = (await response.json()) as GenerateContractResponse;
      if (!response.ok) {
        const missing = payload.missingFields?.length
          ? ` Faltando: ${payload.missingFields.join(', ')}.`
          : '';
        throw new Error((payload.error || 'Nao foi possivel gerar o contrato.') + missing);
      }

      setActionMsg(`Contrato atualizado para ${clientId}.`);
      await loadRows();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Nao foi possivel gerar o contrato.');
    } finally {
      setBusyClient(null);
    }
  };

  useEffect(() => {
    void loadRows({ silentAuth: true });
  }, []);

  const handlePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(false);
    setErrorMsg('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ pin }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setPinError(true);
        throw new Error(payload.error || 'PIN invalido.');
      }

      setPin('');
      setUnlocked(true);
      await loadRows();
    } catch (err: unknown) {
      setPinError(true);
      setErrorMsg(err instanceof Error ? err.message : 'Nao foi possivel autenticar.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
    } finally {
      setUnlocked(false);
      setRows([]);
      setContractTemplate(null);
      setLastSync(null);
      setPin('');
      setActionMsg('');
      setErrorMsg('');
      setWarningMsg('');
    }
  };

  const total = rows.length;
  const readyForContract = rows.filter((row) => getMissingFields(row).length === 0).length;
  const pendingFields = rows.filter((row) => getMissingFields(row).length > 0).length;
  const signedCount = rows.filter((row) => row.contrato_status === 'assinado').length;

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <form onSubmit={handlePin} className="w-full max-w-xs space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-center">
            Admin | Onboarding
          </p>
          <input
            type="password"
            autoFocus
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={`${inputCls} text-center text-lg tracking-[0.5em]`}
          />
          {pinError && <p className="text-xs text-red-400 text-center">PIN incorreto.</p>}
          {errorMsg && !pinError && <p className="text-xs text-red-400 text-center">{errorMsg}</p>}
          <button
            type="submit"
            disabled={checkingSession}
            className="w-full bg-red-600 text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-red-700 transition-colors text-xs disabled:opacity-60"
          >
            {checkingSession ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Admin</p>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Onboarding e contrato</h1>
            <p className="text-sm text-gray-400 mt-2">
              O cliente salva os campos faltantes no onboarding. Aqui voce acompanha o que ja chegou no Supabase.
            </p>
            {contractTemplate && (
              <p className="text-xs text-gray-500 mt-3">
                Modelo ativo: <span className="text-white">{contractTemplate.name}</span>{' '}
                <span className="text-gray-600">({contractTemplate.id})</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs text-gray-500">
              <p>Ultima sincronizacao</p>
              <p>{lastSync ? formatDate(lastSync) : 'Ainda nao carregado'}</p>
            </div>
            <button
              type="button"
              onClick={() => void loadRows()}
              disabled={loading}
              className="bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-xs disabled:opacity-50"
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </button>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="bg-transparent border border-white/10 text-gray-300 font-bold uppercase tracking-widest px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-xs"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Registros</p>
            <p className="text-3xl font-bold mt-3">{total}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Prontos para contrato</p>
            <p className="text-3xl font-bold mt-3">{readyForContract}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Campos pendentes</p>
            <p className="text-3xl font-bold mt-3">{pendingFields}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Contratos assinados</p>
            <p className="text-3xl font-bold mt-3">{signedCount}</p>
          </div>
        </div>

        {errorMsg && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Erro ao carregar o painel: {errorMsg}
        </div>
      )}

        {!errorMsg && warningMsg && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            {warningMsg}
          </div>
        )}

        {actionMsg && !errorMsg && (
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-200">
            {actionMsg}
          </div>
        )}

        {!loading && rows.length === 0 && !errorMsg && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-gray-300">
            Nenhum registro encontrado em <code className="text-red-400">onboarding_dados</code>.
          </div>
        )}

        <div className="grid gap-4">
          {rows.map((row, index) => {
            const missingFields = getMissingFields(row);
            const rowKey = `${row.cliente ?? 'sem-cliente'}-${row.updated_at ?? index}`;
            const showContractLink = canExposeContractLink(row, missingFields);
            const populatedSections = detailSections
              .map((section) => ({
                ...section,
                fields: section.fields.filter((field) => isFilled(row[field.key])),
              }))
              .filter((section) => section.fields.length > 0);

            return (
              <article
                key={rowKey}
                className="rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500">Cliente</p>
                      <h2 className="text-2xl font-bold tracking-tight text-white">
                        {row.cliente?.trim() || 'Sem identificacao'}
                      </h2>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">E-mail principal</p>
                        <p className="text-sm text-white break-all">
                          {row.email_relatorios?.trim() || 'Nao enviado'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Estado civil</p>
                        <p className="text-sm text-white">{row.estado_civil?.trim() || 'Nao enviado'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">CPF</p>
                        <p className="text-sm text-white">{row.cpf_representante?.trim() || 'Nao enviado'}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Razao social</p>
                        <p className="text-sm text-white">{row.razao_social?.trim() || 'Nao salvo'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">CNPJ</p>
                        <p className="text-sm text-white">{row.cnpj?.trim() || 'Nao salvo'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">CRECI</p>
                        <p className="text-sm text-white">{row.creci?.trim() || 'Nao salvo'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Telefone</p>
                        <p className="text-sm text-white">{row.telefone?.trim() || 'Nao salvo'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${getStatusClasses(
                        row.contrato_status
                      )}`}
                    >
                      {getStatusLabel(row.contrato_status)}
                    </span>
                    <div className="text-xs text-gray-500 lg:text-right">
                      <p>Atualizado em</p>
                      <p>{formatDate(row.updated_at)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {missingFields.length > 0 ? (
                      <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-200">
                        Faltando: {missingFields.join(', ')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-300">
                        Campos do contrato completos
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {showContractLink ? (
                      <a
                        href={row.contrato_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                      >
                        Abrir contrato
                      </a>
                    ) : row.contrato_link ? (
                      <span className="text-xs text-gray-500">
                        Existe um contrato antigo salvo, mas ele permanece oculto ate os campos atuais
                        estarem completos.
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">Contrato ainda nao gerado</span>
                    )}

                    {missingFields.length === 0 && (
                      <button
                        type="button"
                        onClick={() => void handleGenerateContract(row)}
                        disabled={busyClient === (row.cliente?.trim() || '')}
                        className="inline-flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-100 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                      >
                        {busyClient === (row.cliente?.trim() || '')
                          ? 'Gerando...'
                          : row.contrato_link
                            ? 'Gerar novamente'
                            : 'Gerar contrato'}
                      </button>
                    )}
                  </div>
                </div>

                {populatedSections.length > 0 && (
                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    {populatedSections.map((section) => (
                      <section
                        key={`${rowKey}-${section.title}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            {section.title}
                          </p>
                          <span className="text-[10px] uppercase tracking-widest text-gray-600">
                            {section.fields.length} enviado{section.fields.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {section.fields.map((field) => {
                            const rawValue = row[field.key];
                            const value = String(rawValue ?? '').trim();
                            const href = field.kind === 'link' ? getFieldHref(value) : null;
                            const mono = field.kind === 'secret';

                            return (
                              <div
                                key={`${rowKey}-${String(field.key)}`}
                                className="rounded-xl border border-white/10 bg-black/20 p-3"
                              >
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                                  {field.label}
                                </p>

                                {href ? (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-red-200 underline decoration-white/15 underline-offset-4 break-all hover:text-white transition-colors"
                                  >
                                    {value}
                                  </a>
                                ) : (
                                  <p
                                    className={`text-sm text-white break-all whitespace-pre-wrap ${
                                      mono ? 'font-mono text-[13px]' : ''
                                    }`}
                                  >
                                    {value}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContractAdmin;
