// Categorias da Base de Conhecimento
export interface KnowledgeCategory {
  id: string;
  name: string;
  icon: string;
}

export const knowledgeCategories: KnowledgeCategory[] = [
  { id: "1", name: "Manuais", icon: "FileText" },
  { id: "2", name: "Drivers", icon: "HardDrive" },
  { id: "3", name: "Tutoriais", icon: "BookOpen" },
  { id: "4", name: "FAQ", icon: "HelpCircle" },
];

// Arquivos da Base de Conhecimento
export interface KnowledgeFile {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "pdf" | "video" | "zip";
  size: string;
  url: string;
  downloadCount: number;
  updatedAt: string;
}

export const knowledgeFiles: KnowledgeFile[] = [
  {
    id: "1",
    title: "Manual do Sistema de Varejo",
    description: "Guia completo de uso do sistema de varejo",
    category: "Manuais",
    type: "pdf",
    size: "2.5 MB",
    url: "/downloads/manual-varejo.pdf",
    downloadCount: 1234,
    updatedAt: "2026-02-15",
  },
  {
    id: "2",
    title: "Driver Impressora Térmica Bematech",
    description: "Driver atualizado para impressoras Bematech",
    category: "Drivers",
    type: "zip",
    size: "15.3 MB",
    url: "/downloads/driver-bematech.zip",
    downloadCount: 856,
    updatedAt: "2026-01-20",
  },
  {
    id: "3",
    title: "Como Emitir NF-e",
    description: "Tutorial passo a passo para emissão de nota fiscal",
    category: "Tutoriais",
    type: "video",
    size: "45 min",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    downloadCount: 2341,
    updatedAt: "2026-02-01",
  },
];

// Vídeos de Treinamento Gratuito
export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  views: number;
  isPremium: boolean;
}

export const trainingVideos: TrainingVideo[] = [
  {
    id: "1",
    title: "Introdução ao Sistema",
    description: "Conheça a interface e funcionalidades básicas",
    duration: "15:30",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Básico",
    views: 5432,
    isPremium: false,
  },
  {
    id: "2",
    title: "Cadastro de Produtos",
    description: "Como cadastrar produtos no sistema",
    duration: "12:45",
    thumbnail:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Básico",
    views: 4231,
    isPremium: false,
  },
  {
    id: "3",
    title: "Relatórios Avançados",
    description: "Aprenda a gerar relatórios personalizados",
    duration: "25:15",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Avançado",
    views: 1823,
    isPremium: true,
  },
  {
    id: "4",
    title: "Integração com E-commerce",
    description: "Conecte seu sistema com lojas virtuais",
    duration: "35:20",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Premium",
    views: 892,
    isPremium: true,
  },
];
