import React from 'react';
import { motion } from 'framer-motion';
import { IconQuote, IconCheck } from './Icons';
import { TestimonialItem } from '../types';

const testimonials: TestimonialItem[] = [
  {
    name: "Ricardo Silva",
    role: "CEO",
    company: "Luppa Consultoria",
    content: "O rebranding aumentou nosso ticket médio em 40% em menos de 3 meses. O Fábio não entrega apenas design, ele entrega inteligência de mercado que posiciona sua empresa como líder.",
    result: "ROI de 5x no primeiro mês"
  },
  {
    name: "Amanda Costa",
    role: "Diretora de Marketing",
    company: "Vortex Tech",
    content: "Já trabalhamos com diversas agências, mas nenhuma teve a visão estratégica que encontramos aqui. A identidade visual nova nos permitiu entrar em mercados internacionais com autoridade.",
    result: "Expansão Internacional"
  },
  {
    name: "Carlos Mendes",
    role: "Founder",
    company: "Start E-commerce",
    content: "A Landing Page projetada converteu 3x mais que a nossa anterior. O investimento se pagou na primeira semana de tráfego. Profissionalismo e entrega impecável.",
    result: "300% de Aumento na Conversão"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-brand-black border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-display uppercase mb-4">
                  Quem já <span className="text-brand-red">Domina</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-md">
                   Não acredite apenas na minha palavra. Veja os resultados de quem decidiu jogar em outro nível.
                </p>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
                <motion.div
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.2 }}
                   className="bg-brand-dark border border-white/5 p-8 rounded-2xl relative hover:border-brand-red/30 transition-colors group"
                >
                   <div className="absolute top-8 right-8 text-brand-red/10 group-hover:text-brand-red/20 transition-colors">
                      <IconQuote />
                   </div>

                   <div className="mb-6">
                      <div className="flex items-center gap-2 mb-1">
                          {[1,2,3,4,5].map(star => (
                              <span key={star} className="text-brand-red text-xs">★</span>
                          ))}
                      </div>
                      <h4 className="text-brand-red font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <IconCheck />
                          {item.result}
                      </h4>
                   </div>

                   <p className="text-gray-300 text-lg italic mb-8 font-light leading-relaxed">
                      "{item.content}"
                   </p>

                   <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white uppercase">
                           {item.name.charAt(0)}
                       </div>
                       <div>
                           <h5 className="font-bold text-white uppercase text-sm">{item.name}</h5>
                           <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.role}, {item.company}</p>
                       </div>
                   </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;