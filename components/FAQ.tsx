import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from './Icons';
import { FAQItem } from '../types';

const questions: FAQItem[] = [
  {
    question: "Quanto custa um projeto?",
    answer: "Não vendo 'preço', vendo ROI. Meus projetos partem de um valor base que garante a dedicação exclusiva e a profundidade estratégica necessária. Para ter um orçamento exato, preciso entender o tamanho do seu desafio. Clique em 'Iniciar Projeto' e vamos conversar."
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "A pressa é inimiga da perfeição, mas o mercado não espera. Um projeto completo de Identidade Visual leva em média 30 a 45 dias. Landing Pages de alta conversão, cerca de 15 a 20 dias. Tudo depende da complexidade e da sua urgência."
  },
  {
    question: "O que exatamente eu recebo?",
    answer: "Você não recebe apenas um logotipo. Você recebe um Ecossistema Visual completo: Brandbook, Guia de Estilo, Arquivos em todos os formatos (vetor, web, print), aplicações em mockups reais e estratégia de uso. É uma caixa de ferramentas completa para sua marca."
  },
  {
    question: "Você atende agências (White Label)?",
    answer: "Sim. Atuo como braço estratégico de design para agências que precisam elevar a barra de entrega para clientes high-ticket. Entre em contato para discutirmos modelos de parceria."
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