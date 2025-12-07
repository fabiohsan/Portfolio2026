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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-20 md:mb-32 rounded-2xl overflow-hidden shadow-2xl">
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors"><AnimatedCounter value={8} suffix="+" /></h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Anos de Jogo</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors"><AnimatedCounter value={120} suffix="+" /></h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Projetos</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors"><AnimatedCounter value={98} suffix="%" /></h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Retenção</p>
                 </div>
                 <div className="bg-brand-black/90 backdrop-blur-sm p-6 md:p-10 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors duration-500">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-2 group-hover:text-brand-red transition-colors">TOP</h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Performance</p>
                 </div>
            </div>

            {/* Marquee Section */}
            <div className="flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-12 text-center px-4"
                >
                    <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-2 block">Network</span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-display uppercase text-white">Empresas Impulsionadas</h3>
                </motion.div>

                <div className="w-screen relative left-[50%] -translate-x-[50%] overflow-hidden bg-brand-black/30 border-y border-white/5 py-8 md:py-12">
                     <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none"></div>
                     <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none"></div>
                    
                    <motion.div 
                        className="flex w-fit"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {/* Tripling the list to ensure seamless loop on large screens */}
                        {[...partners, ...partners, ...partners].map((partner, i) => (
                            <div key={i} className="flex items-center gap-4 px-8 md:px-16 group opacity-40 hover:opacity-100 transition-all duration-300 cursor-default grayscale hover:grayscale-0">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-brand-red group-hover:bg-brand-red/10 transition-colors duration-300 shrink-0">
                                    <span className="font-display text-xl md:text-2xl text-white group-hover:text-brand-red transition-colors duration-300">{partner.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <div className="text-base md:text-xl font-bold uppercase text-white whitespace-nowrap">{partner.name}</div>
                                    <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 group-hover:text-brand-red/80 transition-colors duration-300">{partner.category}</div>
                                </div>
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