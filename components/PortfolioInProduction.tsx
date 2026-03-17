import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const accentCard =
  'rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]';

const PortfolioInProduction: React.FC = () => {
  useEffect(() => {
    document.title = 'FHSAN. | Portfolio Em Producao';
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,31,31,0.24),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.08),_transparent_28%),linear-gradient(135deg,_#050505_0%,_#090909_52%,_#020202_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 md:px-6">
        <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`${accentCard} relative overflow-hidden p-6 md:p-10`}
          >
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-brand-red/20 blur-3xl" />

            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-red">
                <span className="h-2 w-2 rounded-full bg-brand-red" />
                Acesso Temporariamente Fechado
              </span>
              <span className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white/60">
                Portfolio 3D
              </span>
            </div>

            <div className="max-w-4xl">
              <p className="mb-4 text-xs uppercase tracking-[0.38em] text-white/45">FHSAN. Studio</p>
              <h1 className="font-display text-[18vw] leading-[0.82] text-white md:text-[96px] lg:text-[132px]">
                EM
                <span className="block text-brand-red">PRODUCAO</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/74 md:text-base">
                O portfolio 3D esta temporariamente indisponivel enquanto finalizamos uma nova apresentacao,
                reorganizamos os projetos e preparamos a proxima versao da experiencia visual.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-black/30 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">Status</p>
                <p className="mt-3 text-lg font-semibold text-white">Reestruturacao ativa</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/30 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">Objetivo</p>
                <p className="mt-3 text-lg font-semibold text-white">Nova curadoria e UI</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/30 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">Disponibilidade</p>
                <p className="mt-3 text-lg font-semibold text-white">Em breve</p>
              </div>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className={`${accentCard} p-6`}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">Dominio</p>
              <p className="mt-4 break-all font-display text-3xl uppercase leading-none text-white md:text-4xl">
                fhsan.qzz.io
              </p>
              <p className="mt-4 text-sm leading-7 text-white/68">
                Este endereco esta reservado apenas para a publicacao da nova versao. O acesso publico ao portfolio
                foi interrompido temporariamente para evitar navegacao em conteudo incompleto.
              </p>
            </div>

            <div className={`${accentCard} p-6`}>
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">Aviso</p>
              <div className="mt-5 rounded-2xl border border-brand-red/20 bg-brand-red/8 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-red">Portfolio em producao</p>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  O conteudo principal ficara indisponivel ate a conclusao dessa etapa. Quando a nova versao estiver
                  pronta, o acesso sera reaberto neste mesmo dominio.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInProduction;
