import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Método', href: '#metodo' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Sobre', href: '#sobre' }
  ];

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/5 py-4"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-2xl font-black tracking-tighter text-white relative z-50 group">
            FHSAN<span className="text-brand-red group-hover:text-white transition-colors duration-300">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-widest uppercase text-gray-400">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-white transition-all duration-300 relative group overflow-hidden">
                <span className="block relative z-10 group-hover:-translate-y-[150%] transition-transform duration-300">{item.name}</span>
                <span className="absolute inset-0 block translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300 text-brand-red">{item.name}</span>
              </a>
            ))}
          </div>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contato" 
            className="hidden md:inline-flex px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-red hover:text-white transition-colors duration-300"
          >
            Vamos Conversar
          </motion.a>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white relative z-50 p-2" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-6 flex flex-col items-end gap-1.5">
                <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="w-full h-0.5 bg-white block"></motion.span>
                <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-2/3 h-0.5 bg-brand-red block"></motion.span>
                <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0, width: isOpen ? '100%' : '50%' }} className="w-1/2 h-0.5 bg-white block"></motion.span>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center space-y-6 md:space-y-8"
          >
             {navItems.map((item, i) => (
               <motion.a 
                 key={item.name}
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.1 + (i * 0.1) }}
                 href={item.href} 
                 className="text-4xl md:text-5xl font-display uppercase text-transparent stroke-white hover:text-white hover:stroke-none transition-all duration-300"
                 style={{ WebkitTextStroke: '1px white' }}
                 onClick={() => setIsOpen(false)}
               >
                 {item.name}
               </motion.a>
             ))}
             
             <motion.a 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                href="#contato" 
                onClick={() => setIsOpen(false)}
                className="mt-8 px-8 py-3 bg-brand-red text-white rounded-full text-xs font-bold uppercase tracking-widest"
             >
                Solicitar Orçamento
             </motion.a>

             <div className="absolute bottom-10 text-xs text-gray-500 font-mono tracking-widest">
                SÃO PAULO, BR
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;