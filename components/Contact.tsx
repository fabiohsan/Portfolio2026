import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowRight, IconCheck } from './Icons';
import { supabase } from '../src/lib/supabase';

const BUCKET = 'comprovantes';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    budget: '',
    message: ''
  });
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [comprovantePreview, setComprovantePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Apenas imagens são aceitas (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Imagem deve ter menos de 5MB.');
      return;
    }
    setErrorMsg('');
    setComprovante(file);
    setComprovantePreview(URL.createObjectURL(file));
  };

  const removeComprovante = () => {
    setComprovante(null);
    setComprovantePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    try {
      let comprovanteUrl = '';

      if (comprovante) {
        const ext = comprovante.name.split('.').pop();
        const path = `${Date.now()}_${formData.name.replace(/\s+/g, '_')}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, comprovante, { upsert: false });

        if (uploadError) throw new Error(`Upload falhou: ${uploadError.message}`);

        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        comprovanteUrl = urlData.publicUrl;
      }

      const { error: dbError } = await supabase.from('contatos').insert([{
        name: formData.name,
        company: formData.company,
        email: formData.email,
        budget: formData.budget,
        message: formData.message,
        comprovante_url: comprovanteUrl || null,
        created_at: new Date().toISOString()
      }]);

      if (dbError) throw new Error(`Erro ao salvar: ${dbError.message}`);

      setFormState('success');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado. Tente novamente.');
      setFormState('error');
    }
  };

  return (
    <section id="contato" className="py-20 md:py-32 bg-brand-black relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-transparent to-transparent opacity-30"></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10 w-full">
        
        {/* Left Side: Copy */}
        <div className="flex flex-col justify-center text-center lg:text-left">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-8"
            >
                <span className="inline-block py-1 px-3 rounded border border-brand-red/30 bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-widest mb-4">
                    Agenda Aberta para Q3 2025
                </span>
            </motion.div>

            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-7xl font-display uppercase mb-6 md:mb-8 leading-[0.9] tracking-tight"
            >
            Pronto Para <br/>
            <span className="text-transparent stroke-white" style={{WebkitTextStroke: '1px rgba(255,255,255,0.5)'}}>Escalar?</span>
            </motion.h2>
            
            <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-12 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
            Você tem a visão. Eu tenho a estratégia visual para transformar essa visão em um império. Preencha o formulário para aplicarmos o filtro inicial.
            </p>

            <div className="space-y-4 text-sm text-gray-500 font-mono">
                <p>E: contact@fhsan.com</p>
                <p>L: São Paulo, Brasil</p>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white/5 border border-white/10 p-6 md:p-12 rounded-2xl backdrop-blur-sm">
            <AnimatePresence mode="wait">
                {formState === 'success' ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center py-20"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6">
                            <IconCheck />
                        </div>
                        <h3 className="text-2xl font-display uppercase text-white mb-2">Recebido</h3>
                        <p className="text-gray-400 max-w-xs">
                            Sua aplicação foi enviada. Analisarei seu projeto e entrarei em contato em até 24h úteis.
                        </p>
                        <button 
                            onClick={() => setFormState('idle')} 
                            className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-red hover:text-white transition-colors"
                        >
                            Enviar nova mensagem
                        </button>
                    </motion.div>
                ) : (
                    <motion.form 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nome</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-brand-black border border-white/10 p-4 text-white text-base focus:border-brand-red focus:outline-none transition-colors rounded-lg appearance-none"
                                    placeholder="Seu nome"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Empresa</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-brand-black border border-white/10 p-4 text-white text-base focus:border-brand-red focus:outline-none transition-colors rounded-lg appearance-none"
                                    placeholder="Nome da empresa"
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Corporativo</label>
                            <input 
                                required
                                type="email" 
                                className="w-full bg-brand-black border border-white/10 p-4 text-white text-base focus:border-brand-red focus:outline-none transition-colors rounded-lg appearance-none"
                                placeholder="voce@empresa.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Verba Estimada</label>
                            <div className="relative">
                                <select 
                                    required
                                    className="w-full bg-brand-black border border-white/10 p-4 text-white text-base focus:border-brand-red focus:outline-none transition-colors rounded-lg appearance-none"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                >
                                    <option value="" disabled>Selecione um intervalo</option>
                                    <option value="10-30k">R$ 10k - R$ 30k</option>
                                    <option value="30-50k">R$ 30k - R$ 50k</option>
                                    <option value="50k+">R$ 50k +</option>
                                    <option value="undisclosed">Não divulgado</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Detalhes do Projeto</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full bg-brand-black border border-white/10 p-4 text-white text-base focus:border-brand-red focus:outline-none transition-colors rounded-lg resize-none appearance-none"
                                placeholder="Descreva brevemente seu desafio..."
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                        </div>

                        {/* Comprovante PIX */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                Comprovante PIX <span className="text-gray-600 normal-case font-normal">(opcional)</span>
                            </label>

                            {comprovantePreview ? (
                                <div className="relative rounded-lg overflow-hidden border border-white/10">
                                    <img
                                        src={comprovantePreview}
                                        alt="Preview comprovante"
                                        className="w-full max-h-48 object-contain bg-brand-dark"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeComprovante}
                                        className="absolute top-2 right-2 bg-brand-black/80 hover:bg-brand-red text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors text-xs font-bold"
                                        aria-label="Remover imagem"
                                    >
                                        ✕
                                    </button>
                                    <p className="text-xs text-gray-500 px-3 py-2 truncate">{comprovante?.name}</p>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full border border-dashed border-white/20 hover:border-brand-red/60 bg-brand-black hover:bg-brand-red/5 transition-all rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer group"
                                >
                                    <svg className="w-7 h-7 text-gray-600 group-hover:text-brand-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                                        Clique para enviar imagem
                                    </span>
                                    <span className="text-[10px] text-gray-700">JPG, PNG, WebP — máx. 5MB</span>
                                </button>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Erro */}
                        {errorMsg && (
                            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                                {errorMsg}
                            </p>
                        )}

                        <button
                            disabled={formState === 'submitting'}
                            type="submit"
                            onClick={() => { if (formState === 'error') setFormState('idle'); }}
                            className="w-full bg-brand-red text-white font-bold uppercase tracking-widest py-4 md:py-5 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {formState === 'submitting' ? 'Enviando...' : 'Iniciar Aplicação'}
                            {formState === 'idle' && <IconArrowRight />}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>

      </div>
      
      {/* Marquee Footer */}
      <div className="mt-20 w-full overflow-hidden opacity-5 pointer-events-none absolute bottom-0 left-0">
         <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="whitespace-nowrap flex"
         >
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex">
                    <span className="text-[10vw] font-display uppercase text-white mx-12">Visual Authority</span>
                    <span className="text-[10vw] font-display uppercase text-transparent mx-12" style={{WebkitTextStroke: '1px white'}}>Strategy</span>
                </div>
            ))}
         </motion.div>
      </div>
    </section>
  );
};

export default Contact;