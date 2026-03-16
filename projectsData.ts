import { ProjectItem } from './types';

export const categories = ["Todos", "Orgânico", "CAD", "Escultura", "Protótipo", "Desenho Técnico", "Pesquisa"];

export const allProjects: ProjectItem[] = [
  {
    id: 1,
    title: "Simulação de Modelagem Orgânica",
    category: "Orgânico",
    thumbnail: "/projects/organic-print.png",
    image: "/projects/organic-print.png", 
    videoUrl: "/projects/youtube-short-2.mp4",
    colSpan: "md:col-span-2",
    client: "Medicina Veterinária",
    year: "2024",
    description: "Estudo de caso visual apresentando o processo time-lapse de escultura digital anatômica de um modelo muscular canino diretamente na viewport 3D.",
    challenge: "Demonstrar o fluxo de trabalho passo-a-passo da blocagem inicial até o detalhamento fino das fibras musculares e proporções faciais do animal, mantendo a forma coesa para posterior impressão em resina.",
    solution: "No vídeo anexado, observamos a aplicação de pincéis de volume (ClayBuildup e DamStandard no ZBrush) para esculpir e refinar a anatomia orgânica, gerando um modelo hiper-detalhado com topologia controlada.",
    result: "O modelo final fornece uma referência visual precisa do buldogue/raça específica, ideal para estudos veterinários de miologia, demonstrações cirúrgicas e treinamento acadêmico avançado.",
    gallery: [
        "/projects/organic-print.png",
        "/projects/organic-vet.png",
        "/projects/organic-3d.png"
    ]
  },
  {
    id: 2,
    title: "Modelagem Técnica em CAD",
    category: "CAD",
    thumbnail: "/projects/cad-print.png",
    image: "/projects/cad-print.png",
    colSpan: "md:col-span-1",
    client: "Ortopedia Animal",
    year: "2024",
    description: "Modelagem de placa ortopédica e implantes caninos projetados com lógicas construtivas rigorosas para garantir a perfeita osteossíntese.",
    challenge: "Projetar superfícies que se adapatem à cortical óssea irregular de um fêmur canino e calcular resistências e roscas internamente para fixação do implante.",
    solution: "Adoção de software CAD puro para garantir total precisão paramétrica. Foram exportadas versões analisadas topologicamente e gerados *toolpaths* (caminhos de ferramenta) com tolerâncias microscópicas.",
    result: "Design de placa perfeitamente funcional. O protótipo visualizado no software slicer confere exatidão antes da usinagem efetiva ou impressão SLM (metal).",
    gallery: [
        "/projects/cad-print.png",
        "/projects/cad-vet.png",
        "/projects/cad-modeling.png"
    ]
  },
  {
    id: 3,
    title: "Escultura Digital",
    category: "Escultura",
    thumbnail: "/projects/sculpt-print.png",
    image: "/projects/sculpt-print.png",
    colSpan: "md:col-span-1",
    client: "Museologia e Anatomia",
    year: "2023",
    description: "Escultura digital ultra-realista de um crânio animal com captura de microdetalhes de superfície óssea e cavidades sinusais.",
    challenge: "Atingir uma textura óssea convincente e exportar para impressão 3D mantendo todas as micro-ranhuras (suturas cranianas e forames) sem que os suportes destruam a superfície.",
    solution: "Utilização do ZBrush para detalhamento de alta frequência nas áreas menos afetadas pelas árvores de suporte. O planejamento de impressão em ângulo maximizou a qualidade dos dentes e zigomas.",
    result: "Reprodução física hiper-detalhada. As peças finais são usadas para estudo avançado de taxidermia digital e referência anatômica palpável.",
    gallery: [
        "/projects/sculpt-print.png",
        "/projects/sculpt-vet.png",
        "/projects/digital-sculpture.png"
    ]
  },
  {
    id: 4,
    title: "Protótipo Conceitual",
    category: "Protótipo",
    thumbnail: "/projects/prototype-print.png",
    image: "/projects/prototype-print.png", 
    colSpan: "md:col-span-2",
    client: "Pesquisa P&D",
    year: "2023",
    description: "Prototipagem funcional em tecnologia FDM (Deposição de Material Fundido) de uma réplica óssea animal para testes práticos dimensionais.",
    challenge: "Validar geometrias e proporções volumétricas sem gastar recursos excessivos, necessitando de alta estabilidade mecânica das linhas impressas (layer lines).",
    solution: "Preparação meticulosa da malha fechada, com fatiamento voltado ao preenchimento otimizado e paredes externas espessas, ideais para sofrer pressões e ajustes com ferramentas de precisão como paquímetros.",
    result: "Mockup (protótipo) dimensionado perfeitamente. Testes e calibrações de escala foram facilitados, demonstrando total integração entre o arquivo digital e a peça recém fabricada.",
    gallery: [
        "/projects/prototype-print.png",
        "/projects/prototype-vet.png",
        "/projects/3d-prototype.png"
    ]
  },
  {
    id: 5,
    title: "Desenho Técnico Computadorizado",
    category: "Desenho Técnico",
    thumbnail: "/projects/tech-draw-print.png",
    image: "/projects/tech-draw-print.png",
    videoUrl: "/projects/youtube-short.mp4",
    colSpan: "md:col-span-1",
    client: "Instrumental Cirúrgico",
    year: "2023",
    description: "Estudo prático da fusão entre digitalização 3D e CAD: demonstração rotacional da adaptação de uma placa de metal diretamente sobre um crânio fraturado.",
    challenge: "Garantir o perfeito encaixe topológico entre a geometria complexa e orgânica do crânio com a rigidez paramétrica da placa de fixação virtual.",
    solution: "Como visto no vídeo em anexo, a varredura 3D do crânio serviu como molde para o design booleano no software técnico paramétrico, desenhando uma órtese personalizada que abraçasse exatamente os contornos cranianos sem danificar áreas sensíveis.",
    result: "Projeto de reabilitação customizado finalizado. A análise por simulação em tela prova a eficácia do planejamento pré-cirúrgico antes de levar o arquivo ao centro de processamento CNC.",
    gallery: [
        "/projects/tech-draw-print.png",
        "/projects/tech-draw-vet.png",
        "/projects/technical-drawing.png"
    ]
  },
  {
    id: 6,
    title: "Pesquisa e Desenvolvimento 3D",
    category: "Pesquisa",
    thumbnail: "/projects/research-vet.png",
    image: "/projects/research-vet.png",
    colSpan: "md:col-span-1",
    client: "Biomecânica e Genética",
    year: "2024",
    description: "Pesquisa de simulações físicas e desenvolvimento aplicado focando no sequenciamento e visualização estrutural dinâmica.",
    challenge: "Construir malhas dinâmicas que suportassem animação paramétrica em tempo real de sequenciamentos complexos para pesquisa.",
    solution: "Investigação intensiva misturando digitalização, algoritmos paramétricos em CAD, e scripts de rotação em eixos múltiplos para gerar movimentos fluidos anatômicos.",
    result: "Inovação validada visualmente. Os modelos produzidos garantem clareza cirúrgica e genética, comprovando que a renderização dinâmica mitiga riscos e facilita o aprendizado.",
    gallery: [
        "/projects/research-vet.png",
        "/projects/3d-research.png"
    ]
  }
];
