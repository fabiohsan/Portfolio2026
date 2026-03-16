
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
    const rounded = useTransform(springValue, (latest) => Math.round(latest) + suffix);

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Stats: React.FC = () => {
  return (
    <section className="border-t border-white/5 bg-brand-dark py-16 md:py-24 relative overflow-hidden">
        {/* Background gradient for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            {/* Stats Grid - Now Text Highlight Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-24 rounded-2xl overflow-hidden shadow-2xl">
                 <div className="bg-brand-black/90 backdrop-blur-sm p-8 flex flex-col items-start justify-center text-left group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-brand-red mb-3">Design + Mecânica</h3>
                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors">Formação híbrida entre linguagem visual e raciocínio técnico</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-8 flex flex-col items-start justify-center text-left group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-brand-red mb-3">Modelagem Orgânica + CAD</h3>
                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors">Capacidade de atuar entre superfícies complexas e construção precisa</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-8 flex flex-col items-start justify-center text-left group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-brand-red mb-3">Desenho Técnico</h3>
                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors">Base em leitura construtiva, detalhamento e desenho computadorizado</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-8 flex flex-col items-start justify-center text-left group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-brand-red mb-3">Fabricação & Prototipagem</h3>
                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed group-hover:text-white transition-colors">Visão aplicada para peças, ajustes e preparação de modelos</p>
                 </div>
            </div>

            {/* Positioning Block */}
            <div className="w-full relative max-w-4xl mx-auto flex flex-col items-center text-center">
                <div className="flex items-center justify-center mb-8">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-red/50"></div>
                    <span className="mx-4 text-xs font-bold uppercase tracking-[0.3em] text-brand-red">Posicionamento</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-red/50"></div>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-8">
                    Modelagem tridimensional <span className="text-brand-red">aplicada</span>
                </h2>
                
                <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light mb-6">
                    Minha atuação une formação em Design Gráfico, base técnica em Mecânica e repertório em softwares de modelagem orgânica, visualização e CAD para desenvolver peças, estudos tridimensionais e modelos com foco em clareza formal, precisão e aplicação prática.
                </p>
                <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed font-light">
                    Tenho interesse especial em projetos que exigem interpretação técnica, construção de volume, refinamento de superfícies e desenvolvimento de modelos para fins didáticos, laboratoriais e de prototipagem.
                </p>
            </div>
        </div>
    </section>
  );
};

export default Stats;
