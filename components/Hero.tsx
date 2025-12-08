
import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowUpRight } from './Icons';

const Hero: React.FC = () => {

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-brand-black">
      {/* Background Video Showreel (YouTube Embed) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-brand-black">
        <div className="absolute inset-0 bg-brand-black/20 z-10"></div> {/* Lighter overlay to let video pop */}

        {/* Wrapper to force Aspect Ratio Cover and crop YouTube UI */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-full min-h-full">
          <iframe
            className="w-full h-full opacity-80 grayscale-0"
            src="https://www.youtube.com/embed/hszNZTElIzE?autoplay=1&mute=1&controls=0&loop=1&playlist=hszNZTElIzE&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1"
            title="Showreel Background"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ pointerEvents: 'none', border: 'none' }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/10 to-transparent z-10"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full pb-10 md:pb-0">
        <div className="lg:col-span-9 flex flex-col justify-center pt-10 md:pt-0">

          {/* Main Title Animation */}
          <div className="flex flex-col relative z-20 mix-blend-normal">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                className="font-display text-[13vw] leading-none md:text-[11vw] lg:text-[150px] lg:leading-[0.9] uppercase text-white/20 select-none tracking-tight"
              >
                Domine
              </motion.h1>
            </div>
            <div className="relative overflow-visible">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.25 }}
                  className="font-display text-[13vw] leading-none md:text-[11vw] lg:text-[150px] lg:leading-[0.9] uppercase text-brand-red relative z-10 tracking-tight drop-shadow-2xl"
                >
                  O Seu
                </motion.h1>
              </div>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
                className="font-display text-[13vw] leading-none md:text-[11vw] lg:text-[150px] lg:leading-[0.9] uppercase text-white tracking-tight"
              >
                Mercado
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 md:mt-12 max-w-xl"
          >
            <h2 className="text-white text-lg md:text-xl font-bold uppercase mb-4 tracking-wide pr-4">
              Não é sobre Design. É sobre <span className="text-brand-red bg-white/5 px-2 py-1 rounded">Poder</span>.
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-10 border-l-2 border-brand-red pl-6 font-light bg-black/50 backdrop-blur-sm p-4 rounded-r-lg">
              Chega de brigar por preço. Eu crio ecossistemas visuais que posicionam sua marca no topo da cadeia alimentar, transformando percepção em lucro real.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <motion.a
                whileHover="hover"
                href="#portfolio"
                className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-brand-red transition-colors w-fit text-white"
              >
                <motion.span
                  variants={{ hover: { scale: 1.1, backgroundColor: "#FF1F1F", borderColor: "#FF1F1F", color: "white" } }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white transition-colors duration-300 bg-white/5 backdrop-blur-sm"
                >
                  <IconArrowUpRight />
                </motion.span>
                Ver Casos de Sucesso
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
