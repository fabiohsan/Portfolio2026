import React from 'react';
import { motion } from 'framer-motion';
import { IconSearch, IconTarget, IconZap, IconRocket, IconCheck } from './Icons';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Leitura e interpretação",
    description: "O processo começa com o entendimento da referência, da finalidade do modelo e das exigências formais, funcionais e didáticas da peça.",
    icon: <IconSearch />
  },
  {
    number: "02",
    title: "Estrutura e modelagem",
    description: "Desenvolvo a base tridimensional considerando proporção, volume, organização da forma e viabilidade construtiva.",
    icon: <IconTarget />
  },
  {
    number: "03",
    title: "Refinamento técnico",
    description: "Ajusto superfícies, detalhes, espessuras, separações e elementos estruturais conforme a necessidade do projeto e do processo de fabricação.",
    icon: <IconZap />
  },
  {
    number: "04",
    title: "Validação e iteração",
    description: "O modelo evolui por meio de testes, ajustes e feedbacks, garantindo que a peça atenda ao objetivo visual, técnico e prático.",
    icon: <IconRocket />
  },
  {
    number: "05",
    title: "Entrega organizada",
    description: "Os arquivos são preparados e organizados de forma clara para continuidade do trabalho, revisão ou produção.",
    icon: <IconCheck />
  }
];

const Process: React.FC = () => {
  return (
    <section id="processo" className="py-32 bg-brand-dark border-t border-white/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-red font-mono text-xs font-bold uppercase tracking-widest mb-4 block"
          >
            Processo de desenvolvimento
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display uppercase max-w-2xl"
          >
            Do conceito ao <br/>
            <span className="text-white/30">modelo físico</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mt-6 max-w-3xl"
          >
            Cada projeto tridimensional exige mais do que domínio de software. Exige leitura, interpretação, construção e refinamento orientados ao uso final da peça.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Connector Line (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[120%] h-px bg-gradient-to-r from-white/20 to-transparent -z-10 group-hover:from-brand-red/50 transition-colors duration-500"></div>
              )}

              <div className="mb-8 relative">
                 <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(255,31,31,0.3)]">
                    {step.icon}
                 </div>
                 <span className="absolute -bottom-4 -right-2 text-4xl font-display text-white/5 group-hover:text-white/10 transition-colors select-none">
                    {step.number}
                 </span>
              </div>

              <h3 className="text-xl font-bold uppercase mb-4 group-hover:text-brand-red transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed border-l border-white/10 pl-4 group-hover:border-brand-red/50 transition-colors duration-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 p-8 bg-brand-black/50 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
           <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase mb-2">Não pulo etapas.</h4>
              <p className="text-gray-400 text-sm max-w-lg">
                 Modelos bem resolvidos nascem da combinação entre observação, estrutura e refinamento contínuo.
              </p>
           </div>
           <a href="#contato" className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-brand-red hover:text-white transition-all rounded-full">
              Solicitar Projeto
           </a>
        </div>
      </div>
    </section>
  );
};

export default Process;