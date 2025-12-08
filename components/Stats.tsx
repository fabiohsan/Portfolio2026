
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

const partners = [
    { name: "Luppa", category: "Consultoria" },
    { name: "Agência Kory", category: "Marketing" },
    { name: "LV Network", category: "Infraestrutura" },
    { name: "Wimax", category: "Telecom" },
    { name: "Start", category: "Tech" },
    { name: "Vortex", category: "Motion" },
];

const Stats: React.FC = () => {
  return (
    <section className="border-t border-white/5 bg-brand-dark py-16 md:py-24 relative overflow-hidden">
        {/* Background gradient for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-24 rounded-2xl overflow-hidden shadow-2xl">
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors"><AnimatedCounter value={8} suffix="+" /></h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-white transition-colors">Anos de Mercado</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors"><AnimatedCounter value={120} suffix="+" /></h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-white transition-colors">Projetos Entregues</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors"><AnimatedCounter value={98} suffix="%" /></h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-white transition-colors">Satisfação</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors">EXP</h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-white transition-colors">Senioridade Visual</p>
                 </div>
            </div>

            {/* Premium Ticker Section */}
            <div className="w-full relative">
                <div className="flex items-center justify-center mb-10">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-red/50"></div>
                    <span className="mx-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Empresas Impulsionadas</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-red/50"></div>
                </div>

                <div className="w-screen relative left-[50%] -translate-x-[50%] border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
                    {/* Gradient Masks for Fade Effect */}
                    <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-brand-dark to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-brand-dark to-transparent z-20 pointer-events-none"></div>
                    
                    <motion.div 
                        className="flex py-6 md:py-8 items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    >
                        {/* Quadrupling the list for ultra-smooth loop */}
                        {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
                            <div key={i} className="flex items-center gap-4 px-12 md:px-16 group cursor-default shrink-0 opacity-30 hover:opacity-100 transition-all duration-500 filter grayscale hover:grayscale-0">
                                <span className="text-3xl md:text-5xl font-display uppercase text-white tracking-tighter group-hover:text-white transition-colors">
                                    {partner.name}
                                </span>
                                <span className="text-[9px] font-mono uppercase tracking-widest border border-white/20 px-2 py-1 rounded text-gray-400 group-hover:text-brand-red group-hover:border-brand-red transition-colors">
                                    {partner.category}
                                </span>
                                {/* Separator */}
                                <span className="ml-12 md:ml-16 w-1.5 h-1.5 bg-brand-red/50 rounded-full"></span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Stats;
