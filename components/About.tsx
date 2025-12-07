import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="sobre" className="bg-brand-black border-t border-white/5 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden group">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/redlight/800/1000" 
            alt="Designer Portrait" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-brand-red/20 mix-blend-multiply"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-brand-black/90 backdrop-blur p-6 md:p-8 border-l-4 border-brand-red max-w-[200px] md:max-w-xs"
          >
             <div className="text-3xl md:text-4xl font-display text-white mb-1">10+</div>
             <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400">Anos transformando<br/>negócios em marcas</div>
          </motion.div>
        </div>

        {/* Content Side */}
        <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center">
          <span className="text-brand-red text-sm font-mono mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-brand-red"></span>
            MANIFESTO
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-display uppercase leading-[0.9] mb-8"
          >
            Beleza sem <br/>
            <span className="text-white/20">Lucro é Arte.</span>
          </motion.h2>

          <div className="space-y-6 text-gray-400 leading-relaxed text-base md:text-lg font-light">
            <p>
              <strong className="text-white font-bold">O mercado está cheio de "fazedores de layout".</strong> Profissionais que perguntam "qual cor você gosta?" em vez de "qual sua meta de faturamento?".
            </p>
            <p>
              Eu jogo um jogo diferente. Meu foco é entender o DNA do seu negócio e traduzi-lo visualmente para criar <strong className="text-white">autoridade imediata</strong>.
            </p>
            <p>
              Se você quer apenas algo "bonitinho", procure outro. Se você quer uma ferramenta visual estratégica para cobrar mais caro e fechar mais vendas, bem-vindo.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <h4 className="font-bold uppercase text-white mb-2 text-sm tracking-wider">Metodologia</h4>
              <p className="text-xs text-gray-500 font-mono">Pesquisa > Estratégia > Execução > Dominação</p>
            </div>
            <div>
              <h4 className="font-bold uppercase text-white mb-2 text-sm tracking-wider">Especialidade</h4>
              <p className="text-xs text-gray-500 font-mono">Marcas High-Ticket & Lançamentos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;