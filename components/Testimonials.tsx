import React from 'react';
import { motion } from 'framer-motion';
import { IconCheck } from './Icons';

const differentials = [
  {
    title: "Base híbrida entre design e mecânica",
    description: "Uno sensibilidade visual, construção formal e raciocínio técnico de fabricação."
  },
  {
    title: "Facilidade para transitar entre orgânico e técnico",
    description: "Consigo atuar tanto em superfícies complexas quanto em peças estruturadas com lógica construtiva."
  },
  {
    title: "Organização de processo",
    description: "Trabalho com atenção a etapas, refinamentos, revisão de arquivos e continuidade de produção."
  },
  {
    title: "Perfil colaborativo",
    description: "Tenho facilidade para trabalhar com validação constante, absorver feedback técnico e evoluir a peça junto à equipe no dia a dia."
  },
  {
    title: "Foco em aplicação real",
    description: "Busco desenvolver modelos que não funcionem apenas na tela, mas que façam sentido no uso, no estudo e na fabricação."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="diferenciais" className="py-32 bg-brand-black border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-display uppercase mb-4">
                  Diferenciais <span className="text-brand-red">Aplicados</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-md">
                   O que trago para projetos tridimensionais além do domínio das ferramentas.
                </p>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentials.map((item, index) => (
                <motion.div
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.15 }}
                   className="bg-brand-dark border border-white/5 p-8 rounded-2xl relative hover:border-brand-red/30 transition-colors group"
                >
                   <div className="mb-6 flex items-start gap-4">
                      <div className="mt-1 text-brand-red">
                          <IconCheck />
                      </div>
                      <div>
                          <h4 className="font-bold uppercase tracking-wider text-sm mb-3">
                              {item.title}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                              {item.description}
                          </p>
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