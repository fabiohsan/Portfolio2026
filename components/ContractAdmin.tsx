import React, { useState } from 'react';
import { supabase } from '../src/lib/supabase';

const ADMIN_PIN = '0803';

const inputCls =
  'w-full bg-[#0d0d0d] border border-white/10 p-3 text-white text-sm focus:border-red-600 focus:outline-none transition-colors rounded-lg';

export const ContractAdmin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [email, setEmail] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [cpf, setCpf] = useState('');

  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [savedId, setSavedId] = useState<string | null>(null);

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) { setUnlocked(true); setPinError(false); }
    else setPinError(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');
    try {
      const { data, error } = await supabase
        .from('contratos')
        .insert([{ email, estado_civil: estadoCivil, cpf_representante: cpf }])
        .select('id')
        .single();
      if (error) throw new Error(error.message);
      setSavedId(data?.id ?? null);
      setState('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado.');
      setState('error');
    }
  };

  /* PIN gate */
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <form onSubmit={handlePin} className="w-full max-w-xs space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-center">
            Admin — Contratos
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
          <button type="submit" className="w-full bg-red-600 text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-red-700 transition-colors text-xs">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  /* Success */
  if (state === 'success') {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl">✓</div>
          <h2 className="text-xl font-bold uppercase tracking-widest text-white">Contrato Salvo</h2>
          {savedId && (
            <p className="text-xs text-gray-500 font-mono bg-white/5 rounded px-3 py-2 break-all">ID: {savedId}</p>
          )}
          <p className="text-sm text-gray-400">
            Rode <code className="text-red-400">python gen_contract.py</code> para gerar o PDF.
          </p>
          <button
            onClick={() => { setEmail(''); setEstadoCivil(''); setCpf(''); setState('idle'); setSavedId(null); }}
            className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors"
          >
            Novo contrato
          </button>
        </div>
      </div>
    );
  }

  /* Form */
  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Admin</p>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Novo Contrato</h1>
          <p className="text-xs text-gray-500 mt-1">UNUS · Luiz Henrique Filho</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              E-mail para envio <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              className={inputCls}
              placeholder="luiz@unusimobiliario.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Estado Civil <span className="text-red-500">*</span>
            </label>
            <select
              required
              className={inputCls}
              value={estadoCivil}
              onChange={(e) => setEstadoCivil(e.target.value)}
            >
              <option value="" disabled>Selecione</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viúvo">Viúvo</option>
              <option value="União Estável">União Estável</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              CPF do Representante <span className="text-red-500">*</span>
            </label>
            <input
              required
              className={inputCls}
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="w-full bg-red-600 text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
          >
            {state === 'submitting' ? 'Salvando...' : 'Salvar →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContractAdmin;
