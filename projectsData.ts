
import { ProjectItem } from './types';

export const categories = ["Todos", "Branding", "Motion", "Web Design", "UI/UX"];

export const allProjects: ProjectItem[] = [
  {
    id: 1,
    title: "Comfy Retail",
    category: "Motion",
    // Baseado na imagem do showreel com eletrodomésticos
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1920&auto=format&fit=crop", 
    colSpan: "md:col-span-2",
    client: "Comfy Stores",
    year: "2024",
    description: "Campanha de varejo High-Energy com mix de 3D e Motion Graphics.",
    challenge: "A Comfy precisava quebrar o padrão chato de varejo de eletrodomésticos. O desafio era criar assets visuais que mostrassem produtos comuns (geladeiras, aspiradores) de forma mágica e desejável nas redes sociais.",
    solution: "Desenvolvemos um universo surrealista onde os produtos ganham vida. Utilizamos simulações 3D e colagens dinâmicas para criar uma linguagem visual proprietária que mistura o tangível com o fantástico, aumentando drasticamente a retenção nos anúncios.",
    result: "A campanha viralizou organicamente no TikTok e aumentou as vendas do e-commerce em 35% durante o período promocional.",
    gallery: [
        "https://images.unsplash.com/photo-1628191010210-a59de33e5941?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Nasdaq Data",
    category: "UI/UX",
    // Baseado na imagem do showreel com dashboard financeiro
    thumbnail: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=800&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1920&auto=format&fit=crop",
    colSpan: "md:col-span-1",
    client: "Nasdaq Tech",
    year: "2024",
    description: "Interface de visualização de dados financeiros em tempo real.",
    challenge: "Simplificar a leitura de milhões de dados de mercado para novos investidores sem perder a precisão técnica exigida por traders experientes.",
    solution: "UI Design focado em hierarquia cognitiva. Criamos cards modulares com micro-interações que expandem para revelar detalhes, mantendo a tela limpa. O uso de modo escuro profundo com acentos neon guiou a atenção para as flutuações críticas do mercado.",
    result: "Redução de 40% no tempo de onboarding de novos usuários na plataforma.",
    gallery: [
        "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "ShowsHappening",
    category: "Web Design",
    // Baseado na imagem do showreel de ingressos/eventos
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop",
    colSpan: "md:col-span-1",
    client: "ShowsHappening",
    year: "2023",
    description: "Plataforma de venda de ingressos com experiência imersiva.",
    challenge: "A taxa de abandono de carrinho era alta devido a um processo de checkout complexo e visualmente datado.",
    solution: "Redesign completo do fluxo de compra. Implementamos uma visualização de palco 3D interativa para seleção de assentos e simplificamos o pagamento para 2 passos. A identidade visual ganhou cores vibrantes que transmitem a energia do evento ao vivo.",
    result: "Aumento de 22% na conversão final de compra de ingressos.",
    gallery: [
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Luppa Consultoria",
    category: "Branding",
    thumbnail: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop", 
    colSpan: "md:col-span-2",
    client: "Luppa Consultoria Criativa",
    year: "2023",
    description: "Rebranding completo para consultoria estratégica de negócios.",
    challenge: "A Luppa possuía uma imagem visual que não refletia a senioridade e o valor dos seus contratos. A marca era percebida como 'iniciante'.",
    solution: "Desenvolvi um ecossistema visual baseado em tipografia suíça e uma paleta monocromática com acentos de cor estratégicos. O foco foi transmitir solidez, clareza e autoridade imediata.",
    result: "A nova identidade permitiu um reposicionamento de preços imediato, com aumento de 40% no valor dos contratos fechados.",
    gallery: [
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    title: "Kamyshan Identity",
    category: "Branding",
    // Baseado na imagem do showreel com tipografia experimental
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
    colSpan: "md:col-span-1",
    client: "Kamyshan Fashion",
    year: "2023",
    description: "Identidade visual tipográfica para marca de moda urbana.",
    challenge: "Criar uma marca que funcionasse como estampa por si só, sem depender de logotipos figurativos.",
    solution: "Desenvolvemos uma tipografia customizada distorcida que evoca movimento e rebeldia. A marca se torna a própria textura das roupas.",
    result: "A coleção de lançamento com a nova logo esgotou em 48 horas.",
    gallery: [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    title: "Dream Account",
    category: "UI/UX",
    // Baseado na imagem do showreel de perfil/cartão
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1920&auto=format&fit=crop",
    colSpan: "md:col-span-1",
    client: "Dream Digital",
    year: "2024",
    description: "Sistema de perfis digitais para criadores de conteúdo.",
    challenge: "Tornar a gestão de identidade digital divertida e gamificada.",
    solution: "Interface colorida e amigável com cartões de perfil personalizáveis. Foco total em micro-interações que recompensam o usuário por completar seu perfil.",
    result: "Engajamento diário na plataforma subiu 150%.",
    gallery: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];
