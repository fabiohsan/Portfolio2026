import React from 'react';
import { motion } from 'framer-motion';
import { IconMonitor, IconPalette, IconBox, IconTarget } from './Icons';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Modelagem Hard Surface",
    description: "Criação de modelos precisos para produtos, equipamentos e peças focadas em usinagem, corte e simulação física.",
    icon: <IconBox />
  },
  {
    title: "Modelagem Orgânica",
    description: "Desenvolvimento de formas complexas e topologia esculpida para personagens, elementos botânicos e anatomia didática.",
    icon: <IconPalette />
  },
  {
    title: "Prototipagem em CAD",
    description: "Estruturação técnica voltada para impressão 3D (FDM e Resina), considerando tolerâncias, encaixes e métodos de fabricação.",
    icon: <IconTarget />
  },
  {
    title: "Texturização e Render",
    description: "Aplicação de materiais físicos (PBR), iluminação de estúdio e composição técnica para visualização realista de produtos.",
    icon: <IconMonitor />
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Services: React.FC = () => {
  return (
    <section id="competencias" className="py-20 md:py-32 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-display uppercase leading-[0.9]"
            >
            Áreas de <br />
            <span className="text-transparent stroke-white" style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)'}}>Atuação</span>
            </motion.h2>
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="max-w-sm"
            >
               <p className="text-gray-400 text-sm border-l border-brand-red pl-6 py-2 mb-4">
                  Meu foco é traduzir conceitos em modelos tridimensionais íntegros e funcionais.
               </p>
               <a href="#contato" className="text-brand-red text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                  Entrar em contato →
               </a>
            </motion.div>
        </div>

        {/* Grid with hover focus effect */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 group/list"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="group relative border border-white/10 p-8 md:p-12 bg-brand-dark/50 hover:bg-brand-gray hover:border-brand-red/50 transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40 flex flex-col justify-between min-h-[250px] md:min-h-[300px]"
            >
               <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-150 group-hover:rotate-12 pointer-events-none hidden md:block">
                 <div className="text-brand-red scale-[3]">
                    {service.icon}
                 </div>
               </div>
               
               <div>
                   <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-start text-brand-red mb-6">
                      {service.icon}
                   </div>

                   <h3 className="text-2xl md:text-3xl font-display uppercase mb-4 tracking-wide text-white">{service.title}</h3>
                   <p className="text-gray-400 leading-relaxed text-sm font-light">{service.description}</p>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;