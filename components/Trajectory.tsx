import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem, EducationItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    company: "Luppa Consultoria Criativa",
    role: "Head de Criação / Social Media",
    period: "2022 - Presente",
    description: "Responsável pela direção visual e estratégias de conteúdo que aumentaram o engajamento dos clientes em 40%."
  },
  {
    company: "Agência Kory",
    role: "Designer Gráfico Pleno",
    period: "2024 - 2025",
    description: "Liderança de squads criativos para campanhas de varejo e lançamentos digitais de alto tráfego."
  },
  {
    company: "Autônomo",
    role: "Motion Designer",
    period: "2017 - 2021",
    description: "Desenvolvimento de identidades visuais e vinhetas animadas para criadores de conteúdo e startups."
  }
];

const education: EducationItem[] = [
  {
    institution: "Descomplica Faculdade Digital",
    course: "MBA em Marketing Digital e Branding",
    period: "2024 - 2025"
  },
  {
    institution: "UNINTER",
    course: "Graduação em Design Gráfico",
    period: "2021 - 2023"
  }
];

const tools = ["After Effects", "Premiere Pro", "Photoshop", "Illustrator", "Element 3D", "Figma", "UI/UX Strategy"];

const Trajectory: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Column: Trajectory */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display uppercase mb-12"
          >
            Trajetória <span className="text-brand-red">Profissional</span>
          </motion.h2>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 border-l border-white/10 group hover:border-brand-red transition-colors"
              >
                 <span className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-black border border-white/50 group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow-[0_0_10px_rgba(255,255,255,0.2)]"></span>
                 
                 <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                   <h3 className="text-xl font-bold uppercase">{exp.company}</h3>
                   <span className="text-xs text-gray-500 font-mono border border-white/10 px-2 py-1 rounded">{exp.period}</span>
                 </div>
                 <p className="text-brand-red text-xs font-bold uppercase tracking-wider mb-2">{exp.role}</p>
                 <p className="text-gray-400 text-sm max-w-md">{exp.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Formação Acadêmica</h3>
            <div className="space-y-8">
               {education.map((edu, idx) => (
                 <div key={idx} className="border-b border-white/5 pb-4 last:border-0 hover:pl-4 transition-all duration-300">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold">{edu.institution}</h4>
                      <span className="text-xs text-gray-500 font-mono">{edu.period}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{edu.course}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Stack & Tools */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-display uppercase mb-12">
            Stack <span className="text-gray-600">&</span> Tools
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Domínio técnico não é apenas saber usar o software. É saber qual ferramenta entrega a solução visual mais impactante no menor tempo possível.
          </p>

          <div className="flex flex-wrap gap-3">
             {tools.map((tool, idx) => (
               <motion.span 
                 key={idx} 
                 whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000", borderColor: "#fff" }}
                 className="px-4 py-3 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 transition-all cursor-default"
               >
                 {tool}
               </motion.span>
             ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Trajectory;