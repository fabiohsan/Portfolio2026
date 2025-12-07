import React from 'react';
import { motion } from 'framer-motion';
import { IconPlay, IconMonitor, IconPalette, IconBox } from './Icons';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Engenharia de Atenção",
    description: "Motion Design estratégico focado em retenção. Transformo segundos em oportunidades de venda com narrativas visuais que o cérebro não consegue ignorar.",
    icon: <IconPlay />
  },
  {
    title: "Posicionamento Premium",
    description: "Identidade Visual não é deixar bonito. É codificar autoridade. Crio o sistema visual que faz seu cliente sentir que seu produto vale 3x mais antes mesmo de ver o preço.",
    icon: <IconPalette />
  },
  {
    title: "Arquitetura de Conversão",
    description: "Websites desenhados para performance. Uma fusão de estética 'high-end' com UX focado em guiar o usuário até o botão de compra sem atritos.",
    icon: <IconMonitor />
  },
  {
    title: "Venda Silenciosa",
    description: "Packaging e materiais impressos que funcionam como vendedores 24h. Design tátil que gera desejo instantâneo e domina a prateleira.",
    icon: <IconBox />
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
    <section id="servicos" className="py-20 md:py-32 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-display uppercase leading-[0.9]"
            >
            Arsenal <br />
            <span className="text-transparent stroke-white" style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)'}}>Estratégico</span>
            </motion.h2>
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="max-w-sm"
            >
               <p className="text-gray-400 text-sm border-l border-brand-red pl-6 py-2 mb-4">
                  Eu não vendo horas de design. Eu vendo a percepção de valor que escala o seu faturamento.
               </p>
               <a href="#contato" className="text-brand-red text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                  Consultar Disponibilidade →
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
               
               <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 hidden md:block">
                   <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                       <span className="w-2 h-2 bg-brand-red rounded-full"></span>
                       Como isso gera ROI
                   </span>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;