
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/5 py-12 text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-xs text-gray-500 font-mono">
          <span className="text-brand-red text-lg leading-none align-middle mr-2">●</span>
          © 2025 FÁBIO SAN DESIGNER & MOTION.
        </div>

        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <a href="mailto:faabioo201415@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
             Email
          </a>
          <a href="https://www.linkedin.com/in/fabiohsan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
             LinkedIn
          </a>
          <a href="https://www.instagram.com/fabiohsan.dsg/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
             Instagram
          </a>
          <a href="https://wa.me/5537999353014" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
             WhatsApp
          </a>
        </div>

        <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
          Senior Graphic Designer
        </div>

      </div>
    </footer>
  );
};

export default Footer;
