import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowUpRight, IconArrowLeft, IconCheck } from './Icons';
import { ProjectItem } from '../types';

const allProjects: ProjectItem[] = [
  {
    id: 1,
    title: "Nebula Stream",
    category: "Motion",
    image: "https://picsum.photos/seed/nebula/800/600",
    colSpan: "md:col-span-2",
    client: "Nebula Corp",
    year: "2024",
    description: "Plataforma de streaming focada em e-sports e cultura gamer.",
    challenge: "A plataforma sofria com altas taxas de churn nos primeiros 30 segundos de navegação. A marca era percebida como 'genérica' em um mercado saturado por gigantes como Twitch e YouTube.",
    solution: "Desenvolvemos um sistema de Motion Design agressivo e 'glitchy', criando uma linguagem visual que fala diretamente com a geração Z. A interface foi redesenhada para ser dinâmica, com micro-interações constantes que mantém o cérebro engajado.",
    result: "Aumento de 40% no tempo de permanência na home e redução de 15% no churn mensal.",
    gallery: [
        "https://picsum.photos/seed/nebula1/800/600",
        "https://picsum.photos/seed/nebula2/800/600",
        "https://picsum.photos/seed/nebula3/800/600"
    ]
  },
  {
    id: 2,
    title: "Apex Fitness",
    category: "Branding",
    image: "https://picsum.photos/seed/fitness/600/800",
    colSpan: "md:col-span-1",
    client: "Apex Group",
    year: "2023",
    description: "Rede de academias premium focada em alta performance.",
    challenge: "Diferenciar a rede das academias low-cost e justificar um ticket médio 3x superior.",
    solution: "Criamos uma identidade visual minimalista e escura, utilizando tipografia brutalista e fotografia de alto contraste. O branding evoca exclusividade e 'dor', posicionando a academia não como um lugar de lazer, mas como um templo de transformação.",
    result: "Vendas de planos anuais cresceram 200% no trimestre de lançamento.",
    gallery: [
        "https://picsum.photos/seed/fit1/600/800",
        "https://picsum.photos/seed/fit2/600/800"
    ]
  },
  {
    id: 3,
    title: "Lumina Bank",
    category: "Web Design",
    image: "https://picsum.photos/seed/fintech/600/600",
    colSpan: "md:col-span-1",
    client: "Lumina Financial",
    year: "2024",
    description: "Neobank focado em investimentos para alta renda.",
    challenge: "Transmitir solidez e confiança institucional sem parecer um banco tradicional e burocrático.",
    solution: "Uma interface web 'Glassmorphism', utilizando transparências e blur para criar profundidade e modernidade. A paleta de cores sóbria (preto e dourado fosco) comunica luxo discreto.",
    result: "Custo de Aquisição de Cliente (CAC) reduzido em 30% devido à melhoria na conversão da Landing Page.",
    gallery: [
        "https://picsum.photos/seed/bank1/600/600",
        "https://picsum.photos/seed/bank2/600/600"
    ]
  },
  {
    id: 4,
    title: "Cyber Punk Event",
    category: "Motion",
    image: "https://picsum.photos/seed/cyber/800/800",
    colSpan: "md:col-span-2",
    client: "NightCity Prod",
    year: "2023",
    description: "Festival de música eletrônica imersivo.",
    challenge: "Vender 10.000 ingressos em 48 horas sem revelar o lineup completo.",
    solution: "Uma campanha de Motion Design baseada em mistério e realidade aumentada (AR). Criamos filtros de Instagram e teasers animados que viralizaram organicamente.",
    result: "Sold out em 36 horas. ROI de 10x sobre o investimento em design.",
    gallery: [
        "https://picsum.photos/seed/cyber1/800/800",
        "https://picsum.photos/seed/cyber2/800/800",
        "https://picsum.photos/seed/cyber3/800/800"
    ]
  },
  {
    id: 5,
    title: "Eco Coffee",
    category: "Packaging",
    image: "https://picsum.photos/seed/coffee/600/700",
    colSpan: "md:col-span-1",
    client: "EcoBeans",
    year: "2023",
    description: "Café especial orgânico para exportação.",
    challenge: "Destacar o produto em gôndolas de mercados de luxo na Europa.",
    solution: "Packaging tátil com relevo e texturas naturais. Eliminamos 80% das informações da frente da embalagem, focando na pureza visual que o consumidor de luxo valoriza.",
    result: "Produto listado na Whole Foods e Harrods em menos de 6 meses.",
    gallery: [
        "https://picsum.photos/seed/cof1/600/700",
        "https://picsum.photos/seed/cof2/600/700"
    ]
  },
  {
    id: 6,
    title: "Urban Architecture",
    category: "Branding",
    image: "https://picsum.photos/seed/arch/600/600",
    colSpan: "md:col-span-1",
    client: "Urban Studio",
    year: "2024",
    description: "Escritório de arquitetura corporativa.",
    challenge: "A marca antiga era confundida com construtoras populares.",
    solution: "Rebranding completo focado em linhas arquitetônicas e grade modular. O novo logo é dinâmico e se adapta aos formatos das plantas baixas dos projetos.",
    result: "Venceu 3 concorrências públicas na semana seguinte ao relançamento da marca.",
    gallery: [
        "https://picsum.photos/seed/arch1/600/600",
        "https://picsum.photos/seed/arch2/600/600"
    ]
  }
];

const categories = ["Todos", "Motion", "Branding", "Web Design", "Packaging"];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState("Todos");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredProjects = filter === "Todos" 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  const selectedProject = allProjects.find(p => p.id === selectedId);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-brand-dark border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="w-full md:w-auto"
          >
             <span className="text-brand-red font-mono text-xs font-bold uppercase tracking-widest mb-4 block">
                Portfolio Selecionado
             </span>
             <h2 className="text-4xl md:text-6xl font-display uppercase mb-4">
               Casos <span className="text-white/30">Reais</span>
             </h2>
             <p className="text-gray-400 max-w-md text-sm">
               Projetos onde a estratégia encontrou a execução visual impecável. Menos pixels, mais resultados.
             </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex flex-wrap gap-2 w-full md:w-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border transition-all duration-300 flex-grow md:flex-grow-0 text-center ${
                  filter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-gray-500 border-white/10 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layoutId={`card-container-${project.id}`}
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedId(project.id)}
                className={`group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3] md:aspect-auto ${project.colSpan || 'md:col-span-1'} border border-white/5 shadow-2xl min-h-[300px]`}
              >
                {/* Shine Effect Overlay */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 z-10 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Background Image */}
                <motion.img 
                  layoutId={`card-image-${project.id}`}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 border-2 border-transparent group-hover:border-white/10 m-2 rounded-lg z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <span className="text-brand-red text-xs font-bold uppercase tracking-widest mb-2 block">
                      {project.category}
                    </span>
                    <div className="flex justify-between items-end">
                      <motion.h3 className="text-2xl md:text-3xl font-display text-white uppercase">{project.title}</motion.h3>
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 shrink-0">
                        <IconArrowUpRight />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Full Screen Modal */}
        <AnimatePresence>
            {selectedId && selectedProject && (
                <motion.div 
                    className="fixed inset-0 z-[60] bg-brand-black overflow-y-auto scrollbar-hide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Sticky Close Button */}
                    <button 
                        onClick={() => setSelectedId(null)}
                        className="fixed top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-[70] border border-white/20"
                    >
                        ✕
                    </button>

                    {/* Header Image */}
                    <motion.div 
                        layoutId={`card-container-${selectedProject.id}`} 
                        className="relative w-full h-[40vh] md:h-[70vh]"
                    >
                         <motion.img 
                            layoutId={`card-image-${selectedProject.id}`}
                            src={selectedProject.image} 
                            className="w-full h-full object-cover grayscale-0"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent"></div>
                         
                         <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 max-w-7xl mx-auto">
                            <motion.span 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-3 py-1 bg-brand-red text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-4 rounded"
                            >
                                {selectedProject.category}
                            </motion.span>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl lg:text-8xl font-display uppercase text-white"
                            >
                                {selectedProject.title}
                            </motion.h1>
                         </div>
                    </motion.div>

                    {/* Content */}
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                         {/* Sidebar Data */}
                         <div className="lg:col-span-4 space-y-6 md:space-y-8 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
                            <div>
                                <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Cliente</h4>
                                <p className="text-white text-base md:text-lg">{selectedProject.client}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Ano</h4>
                                <p className="text-white text-base md:text-lg">{selectedProject.year}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Descrição</h4>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{selectedProject.description}</p>
                            </div>
                         </div>

                         {/* Main Text */}
                         <div className="lg:col-span-8 space-y-8 md:space-y-12">
                            <div>
                                <h3 className="text-xl md:text-2xl font-display uppercase mb-4 text-white">O Desafio</h3>
                                <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light">
                                    {selectedProject.challenge}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-display uppercase mb-4 text-white">A Solução</h3>
                                <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light">
                                    {selectedProject.solution}
                                </p>
                            </div>
                            
                            <div className="bg-brand-dark border border-white/10 p-6 md:p-8 rounded-lg">
                                <h3 className="text-lg md:text-xl font-display uppercase mb-4 text-brand-red flex items-center gap-2">
                                    <IconCheck /> Resultados
                                </h3>
                                <p className="text-white font-bold text-lg md:text-xl">
                                    {selectedProject.result}
                                </p>
                            </div>
                         </div>
                    </div>

                    {/* Gallery */}
                    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24 md:pb-32">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Galeria do Projeto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {selectedProject.gallery?.map((img, i) => (
                                <motion.img 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    src={img}
                                    className={`w-full h-auto rounded-lg object-cover ${i === 2 ? 'md:col-span-2 aspect-video md:aspect-[21/9]' : 'aspect-square'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="fixed bottom-0 left-0 w-full bg-brand-black/90 backdrop-blur border-t border-white/10 p-4 md:p-6 flex justify-between items-center z-50">
                        <button 
                            onClick={() => setSelectedId(null)}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                        >
                            <IconArrowLeft /> <span className="hidden md:inline">Voltar</span>
                        </button>
                        <a 
                            href="#contato"
                            onClick={() => setSelectedId(null)}
                            className="px-6 py-3 bg-brand-red text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-600 transition-colors"
                        >
                            Quero um resultado assim
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Portfolio;