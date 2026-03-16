import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from './Icons';
import { FAQItem } from '../types';

const questions: FAQItem[] = [
  {
    question: "Quanto custa um projeto?",
    answer: "O custo está atrelado à complexidade da malha e ao rigor dimensional necessário. Projetos de anatomia com alta densidade poligonal, rigs para simulações ou tolerâncias estritas para impressão 3D (SLM/FDM) demandam orçamentos distintos. Me envie sua tomografia (DICOM) ou esboço inicial para avaliarmos."
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "Depende do nível de detalhamento (LOD) e da função. Adaptações rápidas para prototipagem volumétrica podem levar de 3 a 7 dias. Já esculturas musculares hiper-realistas texturizadas ou desenho paramétrico de precisão para placas cirúrgicas podem variar entre 15 e 30 dias de modelagem rigorosa."
  },
  {
    question: "O que exatamente eu recebo?",
    answer: "Você não recebe apenas uma imagem bonita. Entrego a matéria final: arquivos topologicamente corretos (.STL, .OBJ, .STEP), malhas fechadas (manifold) livres de erros para impressão sem falhas, texturas de alta frequência e modelos rigados caso envolva simulação orgânica."
  },
  {
    question: "Você atende agências (White Label)?",
    answer: "Com certeza. Atuo anonimamente como o braço técnico de Inteligência 3D para laboratórios, estúdios de animação médica e agências que precisam elevar o nível das suas entregas visuais e físicas para clientes high-ticket. Operamos sob NDA absoluto."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-dark border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display uppercase mb-4">Dúvidas Frequentes</h2>
          <p className="text-gray-400 text-sm">Quebrando objeções antes de começarmos.</p>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/5 bg-brand-black rounded-lg overflow-hidden hover:border-white/20 transition-colors"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className={`font-bold uppercase text-sm tracking-wide transition-colors ${activeIndex === index ? 'text-brand-red' : 'text-white'}`}>
                    {item.question}
                </span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="text-gray-500 group-hover:text-white transition-colors"
                >
                  <IconChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;