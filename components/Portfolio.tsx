
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { IconArrowUpRight, IconArrowLeft, IconCheck, IconX, IconChevronLeft, IconChevronRight } from './Icons';
import { allProjects } from '../projectsData';
import { ProjectItem } from '../types';

// Component extracted to prevent re-renders
const ProjectCard: React.FC<{ 
  project: ProjectItem; 
  onClick: (id: number) => void; 
  setIsHoveringProject: (v: boolean) => void;
}> = ({ 
  project, 
  onClick, 
  setIsHoveringProject 
}) => (
  <motion.div
    layoutId={`card-container-${project.id}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    onMouseEnter={() => setIsHoveringProject(true)}
    onMouseLeave={() => setIsHoveringProject(false)}
    onClick={() => onClick(project.id)}
    className="group relative rounded-[2rem] overflow-hidden cursor-none aspect-[4/5] w-full mb-8 border border-white/5 bg-brand-black"
  >
    {/* Background Media - Video or Image */}
    {project.videoUrl ? (
      <motion.video
        layoutId={`card-image-${project.id}`}
        src={project.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
      />
    ) : (
      <motion.img 
        layoutId={`card-image-${project.id}`}
        src={project.thumbnail} 
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
      />
    )}

    {/* Gradient Overlay (Only visible on hover) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Content - Hidden initially, Slides up on hover */}
    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
        <div className="flex justify-between items-end">
          <div>
            <span className="inline-block px-3 py-1 bg-brand-red text-white text-[9px] font-bold uppercase tracking-widest rounded mb-3">
                {project.category}
            </span>
            <h3 className="text-3xl font-display text-white uppercase leading-none">{project.title}</h3>
            <p className="text-gray-400 text-xs mt-2 font-mono uppercase tracking-wide">{project.client}</p>
          </div>
          
          <div className="hidden md:block">
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white">
                  <IconArrowUpRight />
              </div>
          </div>
        </div>
    </div>
  </motion.div>
);

const Portfolio: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Custom Cursor State
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Parallax Logic
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Split projects into 2 columns for parallax effect
  const column1Projects = allProjects.filter((_, i) => i % 2 === 0);
  const column2Projects = allProjects.filter((_, i) => i % 2 !== 0);

  // Smoother parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 40); // Offset to center the 80px cursor
      cursorY.set(e.clientY - 40);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  const selectedProject = allProjects.find(p => p.id === selectedId);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  // Lightbox Navigation Logic
  const handleNextImage = useCallback(() => {
    if (selectedProject && selectedProject.gallery && lightboxIndex !== null) {
        setLightboxIndex((prev) => 
            prev === selectedProject.gallery!.length - 1 ? 0 : prev! + 1
        );
    }
  }, [selectedProject, lightboxIndex]);

  const handlePrevImage = useCallback(() => {
    if (selectedProject && selectedProject.gallery && lightboxIndex !== null) {
        setLightboxIndex((prev) => 
            prev === 0 ? selectedProject.gallery!.length - 1 : prev! - 1
        );
    }
  }, [selectedProject, lightboxIndex]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (lightboxIndex === null) return;
        
        if (e.key === 'ArrowRight') handleNextImage();
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'Escape') setLightboxIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNextImage, handlePrevImage]);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-brand-dark border-t border-white/5 relative z-20" ref={containerRef}>
      
      {/* Custom Cursor Element */}
      <motion.div 
        className="fixed top-0 left-0 w-20 h-20 bg-brand-red rounded-full pointer-events-none z-[60] flex items-center justify-center mix-blend-difference"
        style={{ 
            x: cursorXSpring, 
            y: cursorYSpring,
            opacity: isHoveringProject ? 1 : 0,
            scale: isHoveringProject ? 1 : 0,
        }}
      >
        <span className="text-white font-bold text-[10px] tracking-widest uppercase">View</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
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
          </motion.div>
          
          <div className="text-right hidden md:block">
              <p className="text-xs text-gray-500 font-mono">SCROLL TO EXPLORE</p>
          </div>
        </div>

        {/* Responsive Layout */}
        {isMobile ? (
             /* Mobile: Single Column, Natural Order, No Parallax */
             <div className="flex flex-col gap-8">
                {allProjects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onClick={setSelectedId}
                        setIsHoveringProject={setIsHoveringProject}
                    />
                ))}
             </div>
        ) : (
            /* Desktop: Parallax Columns */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Column 1 - Moves Up Slower */}
                <motion.div style={{ y: y1 }} className="flex flex-col gap-8">
                    {column1Projects.map(project => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onClick={setSelectedId}
                            setIsHoveringProject={setIsHoveringProject}
                        />
                    ))}
                </motion.div>
                
                {/* Column 2 - Moves Down (or starts offset) */}
                <motion.div style={{ y: y2 }} className="flex flex-col gap-8 md:pt-32">
                    {column2Projects.map(project => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onClick={setSelectedId}
                            setIsHoveringProject={setIsHoveringProject}
                        />
                    ))}
                </motion.div>
            </div>
        )}
        
        {/* Full Screen Modal (Detailed View) */}
        <AnimatePresence>
            {selectedId && selectedProject && (
                <motion.div 
                    className="fixed inset-0 z-[70] bg-brand-black/60 backdrop-blur-2xl overflow-y-auto scrollbar-hide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Sticky Close Button */}
                    <button 
                        onClick={() => setSelectedId(null)}
                        className="fixed top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 hover:bg-brand-red hover:border-brand-red transition-all duration-300 z-[80] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <IconX />
                    </button>

                    {/* Header Image */}
                    <motion.div 
                        layoutId={`card-container-${selectedProject.id}`} 
                        className="relative w-full h-[50vh] md:h-[75vh]"
                    >
                         {selectedProject.videoUrl ? (
                            <motion.video 
                                layoutId={`card-image-${selectedProject.id}`}
                                src={selectedProject.videoUrl} 
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover grayscale-0"
                            />
                         ) : (
                             <motion.img 
                                layoutId={`card-image-${selectedProject.id}`}
                                src={selectedProject.image} 
                                className="w-full h-full object-cover grayscale-0"
                             />
                         )}
                         <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"></div>
                         
                         <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
                            <motion.span 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-4 py-2 bg-brand-red text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 rounded-full"
                            >
                                {selectedProject.category}
                            </motion.span>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl lg:text-9xl font-display uppercase text-white leading-none"
                            >
                                {selectedProject.title}
                            </motion.h1>
                         </div>
                    </motion.div>

                    {/* Content */}
                    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                         {/* Sidebar Data */}
                         <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
                            <div className="border-l-2 border-brand-red pl-6 py-2">
                                <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Cliente</h4>
                                <p className="text-white text-xl font-display uppercase">{selectedProject.client}</p>
                            </div>
                            <div className="border-l-2 border-white/10 pl-6 py-2">
                                <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Ano</h4>
                                <p className="text-white text-xl font-display uppercase">{selectedProject.year}</p>
                            </div>
                            <div className="border-l-2 border-white/10 pl-6 py-2">
                                <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Briefing</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.description}</p>
                            </div>
                         </div>

                         {/* Main Text */}
                         <div className="lg:col-span-8 space-y-16">
                            <div>
                                <h3 className="text-3xl font-display uppercase mb-6 text-white">O Desafio</h3>
                                <p className="text-gray-300 leading-loose text-lg font-light">
                                    {selectedProject.challenge}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-display uppercase mb-6 text-white">A Solução</h3>
                                <p className="text-gray-300 leading-loose text-lg font-light">
                                    {selectedProject.solution}
                                </p>
                            </div>
                            
                            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl">
                                <h3 className="text-2xl font-display uppercase mb-4 text-brand-red flex items-center gap-3">
                                    <IconCheck /> Impacto Gerado
                                </h3>
                                <p className="text-white font-bold text-2xl md:text-3xl">
                                    {selectedProject.result}
                                </p>
                            </div>
                         </div>
                    </div>

                    {/* Gallery Grid (Click to open Lightbox) */}
                    <div className="max-w-7xl mx-auto px-6 pb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px bg-white/20 flex-grow"></div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Visuals</h3>
                            <div className="h-px bg-white/20 flex-grow"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {selectedProject.gallery?.map((img, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative cursor-pointer group overflow-hidden rounded-2xl ${i === 2 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'}`}
                                    onClick={() => setLightboxIndex(i)}
                                >
                                    <img 
                                        src={img}
                                        alt={`Gallery ${i}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                                            <IconArrowUpRight />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="fixed bottom-0 left-0 w-full bg-brand-black/80 backdrop-blur-md border-t border-white/10 p-6 flex justify-between items-center z-50">
                        <button 
                            onClick={() => setSelectedId(null)}
                            className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors"
                        >
                            <IconArrowLeft /> Voltar
                        </button>
                        <a 
                            href="#contato"
                            onClick={() => setSelectedId(null)}
                            className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-red hover:text-white transition-all shadow-lg hover:shadow-brand-red/50"
                        >
                            Solicitar Orçamento Similar
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* LIGHTBOX OVERLAY */}
        <AnimatePresence>
            {lightboxIndex !== null && selectedProject?.gallery && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
                >
                    {/* Close Button */}
                    <button 
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-6 right-6 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20"
                    >
                        <IconX />
                    </button>

                    {/* Main Image */}
                    <div className="relative w-full h-[80vh] flex items-center justify-center px-4 md:px-20">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                            className="hidden md:flex absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-white/20 text-white rounded-full transition-all"
                        >
                            <IconChevronLeft />
                        </button>

                        <motion.img 
                           key={lightboxIndex}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           src={selectedProject.gallery[lightboxIndex]}
                           alt="Lightbox view"
                           className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                           loading="eager"
                        />

                        <button 
                            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                            className="hidden md:flex absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-white/20 text-white rounded-full transition-all"
                        >
                            <IconChevronRight />
                        </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="absolute bottom-6 left-0 w-full px-6 overflow-x-auto scrollbar-hide flex justify-center gap-4">
                        {selectedProject.gallery.map((img, i) => (
                            <button 
                                key={i}
                                onClick={() => setLightboxIndex(i)}
                                className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${lightboxIndex === i ? 'border-brand-red opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" loading="lazy" />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Navigation Helpers */}
                    <div className="md:hidden absolute inset-0 flex">
                         <div className="w-1/2 h-full z-10" onClick={handlePrevImage}></div>
                         <div className="w-1/2 h-full z-10" onClick={handleNextImage}></div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Portfolio;
