
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="sobre" className="bg-brand-black border-t border-white/5 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative h-[60vh] lg:h-auto overflow-hidden group">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="/fabio.jpg" // A foto do Fabio com blazer bege e tablet deve ser salva com este nome na pasta public
            alt="Fábio Henrique Nascimento" 
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-brand-black/90 backdrop-blur p-6 md:p-8 border-l-4 border-brand-red max-w-[200px] md:max-w-xs"
          >
             <div className="text-3xl md:text-4xl font-display text-white mb-1">8+</div>
             <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400">Anos transformando<br/>negócios em marcas</div>
          </motion.div>
        </div>

        {/* Content Side */}
        <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center">
          <span className="text-brand-red text-sm font-mono mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-brand-red"></span>
            FÁBIO HENRIQUE NASCIMENTO
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-display uppercase leading-[0.9] mb-8"
          >
            Design <br/>
            <span className="text-white/20">Estratégico.</span>
          </motion.h2>

          <div className="space-y-6 text-gray-400 leading-relaxed text-base md:text-lg font-light">
            <p>
              Sou Designer Gráfico Sênior e Especialista em Motion Design, focado em criar soluções visuais impactantes e alinhadas às estratégias de marca.
            </p>
            <p>
              Com um <strong>MBA em Marketing e Branding</strong>, minha atuação vai além da estética. Uno funcionalidade e estratégia para conectar marcas ao seu público. Minha paixão pelo Motion Design me permite transformar conceitos em narrativas visuais envolventes, utilizando animações avançadas que cativam e engajam.
            </p>
            <p>
               Atuo na criação de identidades visuais com propósito, campanhas digitais voltadas para resultados e produção de conteúdo visual de alta qualidade.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <h4 className="font-bold uppercase text-white mb-2 text-sm tracking-wider">Formação</h4>
              <p className="text-xs text-gray-500 font-mono">MBA em Marketing e Branding (Descomplica)</p>
              <p className="text-xs text-gray-500 font-mono">Design Gráfico (UNINTER)</p>
            </div>
            <div>
              <h4 className="font-bold uppercase text-white mb-2 text-sm tracking-wider">Expertise</h4>
              <p className="text-xs text-gray-500 font-mono">Motion Design, Branding & UI/UX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
