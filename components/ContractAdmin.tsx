import React, { useEffect, useState } from 'react';
import { supabase } from '../src/lib/supabase';

const ADMIN_PIN = '0803';

const inputCls =
  'w-full bg-[#0d0d0d] border border-white/10 p-3 text-white text-sm focus:border-red-600 focus:outline-none transition-colors rounded-lg';

type OnboardingRow = {
  cliente: string | null;
  email_relatorios: string | null;
  estado_civil: string | null;
  cpf_representante: string | null;
  contrato_status: string | null;
  contrato_link: string | null;
  updated_at: string | null;
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

const getMissingFields = (row: OnboardingRow) => {
  const missing: string[] = [];

  if (!row.email_relatorios?.trim()) missing.push('E-mail');
  if (!row.estado_civil?.trim()) missing.push('Estado civil');
  if (!row.cpf_representante?.trim()) missing.push('CPF');

  return missing;
};

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

export const ContractAdmin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [rows, setRows] = useState<OnboardingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSync, setLastSync] = useState<string | null>(null);

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setUnlocked(true);
      setPinError(false);
      return;
    }

    setPinError(true);
  };

  const loadRows = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('onboarding_dados')
        .select('cliente,email_relatorios,estado_civil,cpf_representante,contrato_status,contrato_link,updated_at')
        .order('updated_at', { ascending: false })
        .limit(100);

      if (error) throw new Error(error.message);

      setRows((data as OnboardingRow[] | null) ?? []);
      setLastSync(new Date().toISOString());
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Nao foi possivel carregar os dados do onboarding.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!unlocked) return;
    void loadRows();
  }, [unlocked]);

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
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-red-700 transition-colors text-xs"
          >
            Entrar
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
              O cliente salva os campos faltantes no onboarding. Aqui voce so acompanha o que ja chegou no Supabase.
            </p>
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

        {!loading && rows.length === 0 && !errorMsg && (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-gray-300">
            Nenhum registro encontrado em <code className="text-red-400">onboarding_dados</code>.
          </div>
        )}

        <div className="grid gap-4">
          {rows.map((row, index) => {
            const missingFields = getMissingFields(row);
            const rowKey = `${row.cliente ?? 'sem-cliente'}-${row.updated_at ?? index}`;

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
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">E-mail</p>
                        <p className="text-sm text-white break-all">{row.email_relatorios?.trim() || 'Nao enviado'}</p>
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

                  {row.contrato_link ? (
                    <a
                      href={row.contrato_link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                    >
                      Abrir contrato
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500">Contrato ainda nao gerado</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContractAdmin;
