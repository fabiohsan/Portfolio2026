
import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem, EducationItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    company: "Luppa Consultoria Criativa",
    role: "Gerente de Mídias Sociais",
    period: "Jan 2022 - Presente",
    description: "Gestão estratégica de branding e criação de conteúdo. Desenvolvimento de narrativas visuais alinhadas ao crescimento da consultoria."
  },
  {
    company: "Agência Kory",
    role: "Designer Gráfico Pleno",
    period: "Jul 2024 - Mai 2025",
    description: "Liderança criativa, desenvolvimento de peças gráficas e digitais com alto padrão de qualidade para diversos clientes."
  },
  {
    company: "LV Network",
    role: "Analista de Suporte Técnico",
    period: "Ago 2017 - Ago 2021",
    description: "Administração e suporte de rede para provedores, identificação e solução de problemas técnicos."
  },
  {
    company: "Autônomo",
    role: "Freelancer Motion Designer",
    period: "Set 2017 - 2021",
    description: "Projetos de Motion Graphics, animações 2D/3D e identidades visuais."
  },
  {
    company: "Wimax Internet",
    role: "Analista de Suporte Técnico",
    period: "Out 2016 - Out 2017",
    description: "Suporte técnico e atendimento ao cliente em telecomunicações."
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

const softwareGroups = [
  {
    category: "Modelagem Orgânica / Escultura Digital",
    tools: ["ZBrush", "Blender", "Autodesk Maya"]
  },
  {
    category: "Modelagem Técnica / CAD",
    tools: ["SolidWorks", "Fusion 360", "AutoCAD"]
  },
  {
    category: "Visualização e Apoio 3D",
    tools: ["3ds Max", "Cinema 4D", "Marvelous Designer"]
  }
];

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
            Softwares <span className="text-gray-600">&</span> Ferramentas
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Domínio técnico aliado à precisão construtiva. Ferramentas são o meio para entregar modelos tridimensionais íntegros e funcionais.
          </p>

          <div className="space-y-8">
            {softwareGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-brand-red mb-4">{group.category}</h3>
                 <div className="flex flex-wrap gap-3">
                    {group.tools.map((tool, idx) => (
                      <motion.span 
                        key={idx} 
                        whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000", borderColor: "#fff" }}
                        className="px-4 py-3 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 transition-all cursor-default"
                      >
                        {tool}
                      </motion.span>
                    ))}
                 </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Trajectory;
