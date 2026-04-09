export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readTime: number; // em minutos
  views?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// Categorias disponíveis
export const blogCategories: Category[] = [
  { id: "1", name: "Sistemas de Gestão", slug: "sistemas-gestao", count: 8 },
  { id: "2", name: "Automação Comercial", slug: "automacao-comercial", count: 12 },
  { id: "3", name: "Dicas e Tutoriais", slug: "dicas-tutoriais", count: 15 },
  { id: "4", name: "Tecnologia", slug: "tecnologia", count: 10 },
  { id: "5", name: "Novidades", slug: "novidades", count: 6 },
];

// Posts de exemplo
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "como-escolher-sistema-gestao-para-seu-negocio",
    title: "Como Escolher o Sistema de Gestão Ideal para seu Negócio",
    excerpt:
      "Descubra os principais critérios para escolher um sistema de gestão que atenda às necessidades da sua empresa e impulsione seus resultados.",
    content: `
      <p>Escolher o sistema de gestão adequado é uma decisão estratégica que pode impactar significativamente o sucesso do seu negócio. Neste artigo, vamos abordar os principais pontos que você deve considerar.</p>
      
      <h2>1. Identifique as Necessidades do seu Negócio</h2>
      <p>Antes de escolher qualquer sistema, é fundamental entender quais são as dores e necessidades específicas da sua operação. Pergunte-se:</p>
      <ul>
        <li>Quais processos precisam ser automatizados?</li>
        <li>Qual o volume de transações diárias?</li>
        <li>Quantos usuários vão utilizar o sistema?</li>
        <li>Precisa de integração com outros sistemas?</li>
      </ul>
      
      <h2>2. Avalie a Escalabilidade</h2>
      <p>O sistema escolhido deve crescer junto com seu negócio. Certifique-se de que a solução suporta expansão de usuários, filiais e funcionalidades sem grandes custos adicionais.</p>
      
      <h2>3. Suporte e Treinamento</h2>
      <p>Um bom fornecedor oferece suporte técnico de qualidade e treinamento para sua equipe. Isso garante que você aproveite ao máximo todas as funcionalidades do sistema.</p>
      
      <h2>4. Custo-Benefício</h2>
      <p>Não escolha apenas pelo preço mais baixo. Avalie o retorno sobre investimento (ROI) que o sistema pode proporcionar através de ganhos de produtividade e redução de erros.</p>
      
      <p><strong>Conclusão:</strong> A escolha do sistema de gestão ideal requer análise cuidadosa de vários fatores. Na Lógica Automação Comercial, oferecemos consultoria gratuita para ajudar você a tomar a melhor decisão.</p>
    `,
    author: { name: "Equipe Lógica" },
    category: "Sistemas de Gestão",
    tags: ["Gestão", "ERP", "Dicas"],
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    publishedAt: "2026-03-05",
    readTime: 5,
    views: 234,
  },
  {
    id: "2",
    slug: "5-beneficios-automacao-comercial-para-varejo",
    title: "5 Benefícios da Automação Comercial para o Varejo",
    excerpt:
      "Entenda como a automação pode transformar a gestão do seu varejo, reduzir custos e aumentar a satisfação dos clientes.",
    content: `
      <p>A automação comercial deixou de ser um diferencial para se tornar uma necessidade no varejo moderno. Veja os principais benefícios:</p>
      
      <h2>1. Redução de Erros Operacionais</h2>
      <p>Sistemas automatizados eliminam erros manuais no cadastro de produtos, controle de estoque e emissão de notas fiscais.</p>
      
      <h2>2. Agilidade no Atendimento</h2>
      <p>Com um sistema PDV integrado, o tempo de atendimento diminui significativamente, melhorando a experiência do cliente.</p>
      
      <h2>3. Controle de Estoque em Tempo Real</h2>
      <p>Saiba exatamente o que você tem em estoque a qualquer momento, evitando rupturas e compras desnecessárias.</p>
      
      <h2>4. Gestão Financeira Precisa</h2>
      <p>Tenha controle total sobre entradas, saídas, contas a pagar e receber de forma automática e organizada.</p>
      
      <h2>5. Relatórios Gerenciais</h2>
      <p>Tome decisões baseadas em dados concretos com relatórios detalhados de vendas, produtos mais vendidos, ticket médio e muito mais.</p>
      
      <p><strong>Quer saber mais?</strong> Entre em contato conosco e descubra como podemos automatizar seu varejo!</p>
    `,
    author: { name: "Equipe Lógica" },
    category: "Automação Comercial",
    tags: ["Varejo", "Automação", "PDV"],
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    publishedAt: "2026-03-03",
    readTime: 4,
    views: 189,
  },
  {
    id: "3",
    slug: "importancia-backup-dados-empresariais",
    title: "A Importância do Backup de Dados Empresariais",
    excerpt:
      "Proteja seu negócio contra perda de dados com estratégias eficientes de backup e recuperação de desastres.",
    content: `
      <p>A perda de dados pode significar o fim de um negócio. Estudos mostram que 60% das pequenas empresas que sofrem perda catastrófica de dados fecham as portas em até 6 meses.</p>
      
      <h2>Por que Fazer Backup?</h2>
      <p>Existem diversos motivos que podem causar perda de dados:</p>
      <ul>
        <li>Falhas de hardware</li>
        <li>Ataques de ransomware</li>
        <li>Erros humanos</li>
        <li>Desastres naturais</li>
        <li>Problemas de software</li>
      </ul>
      
      <h2>Regra 3-2-1 de Backup</h2>
      <p>A estratégia mais recomendada é:</p>
      <ul>
        <li><strong>3</strong> cópias dos dados</li>
        <li><strong>2</strong> tipos diferentes de mídia</li>
        <li><strong>1</strong> cópia fora do local (nuvem)</li>
      </ul>
      
      <h2>Soluções da Lógica</h2>
      <p>Oferecemos soluções completas de backup automático com armazenamento em nuvem, garantindo a segurança dos seus dados 24/7.</p>
    `,
    author: { name: "Equipe Lógica" },
    category: "Tecnologia",
    tags: ["Backup", "Segurança", "Data Center"],
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    publishedAt: "2026-03-01",
    readTime: 6,
    views: 312,
  },
  {
    id: "4",
    slug: "como-funciona-emissao-nfe-em-restaurantes",
    title: "Como Funciona a Emissão de NF-e em Restaurantes",
    excerpt:
      "Guia completo sobre emissão de nota fiscal eletrônica para estabelecimentos de alimentação e suas particularidades.",
    content: `
      <p>A emissão de NF-e em restaurantes tem particularidades que precisam ser observadas. Vamos explicar tudo neste artigo.</p>
      
      <h2>Tipos de Nota Fiscal</h2>
      <p>Restaurantes podem emitir diferentes tipos de documentos fiscais:</p>
      <ul>
        <li><strong>NF-e (Nota Fiscal Eletrônica):</strong> Para vendas em geral</li>
        <li><strong>NFC-e (Nota Fiscal ao Consumidor Eletrônica):</strong> Para vendas no balcão</li>
        <li><strong>SAT (Sistema Autenticador e Transmissor):</strong> Em alguns estados</li>
      </ul>
      
      <h2>Emissão Automática</h2>
      <p>Com um sistema de gestão integrado, a emissão de notas fiscais acontece automaticamente no momento do fechamento da conta, garantindo agilidade e conformidade fiscal.</p>
      
      <h2>Benefícios da Automação</h2>
      <ul>
        <li>Redução de erros na emissão</li>
        <li>Economia de tempo</li>
        <li>Compliance fiscal garantido</li>
        <li>Integração com contabilidade</li>
      </ul>
    `,
    author: { name: "Equipe Lógica" },
    category: "Dicas e Tutoriais",
    tags: ["NF-e", "Restaurante", "Fiscal"],
    coverImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=400&fit=crop",
    publishedAt: "2026-02-28",
    readTime: 7,
    views: 267,
  },
  {
    id: "5",
    slug: "tendencias-tecnologia-varejo-2026",
    title: "Tendências de Tecnologia para o Varejo em 2026",
    excerpt:
      "Conheça as principais tendências tecnológicas que vão transformar o varejo neste ano e como se preparar para elas.",
    content: `
      <p>O varejo está em constante evolução. Veja as principais tendências para 2026:</p>
      
      <h2>1. Inteligência Artificial no Atendimento</h2>
      <p>Chatbots e assistentes virtuais estão cada vez mais sofisticados, oferecendo atendimento personalizado 24/7.</p>
      
      <h2>2. Pagamentos Digitais</h2>
      <p>PIX, carteiras digitais e pagamentos por aproximação dominam as transações. Seu sistema precisa estar preparado.</p>
      
      <h2>3. Experiência Omnichannel</h2>
      <p>Integração perfeita entre loja física, e-commerce e redes sociais é fundamental para competir.</p>
      
      <h2>4. Analytics e Big Data</h2>
      <p>Decisões baseadas em dados concretos são o diferencial competitivo do varejo moderno.</p>
      
      <h2>5. Sustentabilidade Digital</h2>
      <p>Nota fiscal eletrônica, cupom digital e redução de papel são tendências que vieram para ficar.</p>
    `,
    author: { name: "Equipe Lógica" },
    category: "Novidades",
    tags: ["Tendências", "Tecnologia", "Inovação"],
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    publishedAt: "2026-02-25",
    readTime: 8,
    views: 445,
  },
  {
    id: "6",
    slug: "controle-estoque-pequeno-varejo",
    title: "Controle de Estoque para Pequeno Varejo: Guia Prático",
    excerpt:
      "Aprenda técnicas simples e eficientes para fazer o controle de estoque do seu pequeno comércio sem complicação.",
    content: `
      <p>O controle de estoque é um dos maiores desafios do pequeno varejo. Veja como resolver isso de forma prática.</p>
      
      <h2>Principais Problemas</h2>
      <ul>
        <li>Produtos vencidos ou obsoletos</li>
        <li>Falta de produtos mais vendidos</li>
        <li>Excesso de capital parado</li>
        <li>Desorganização do estoque</li>
      </ul>
      
      <h2>Metodologia PEPS</h2>
      <p><strong>PEPS (Primeiro que Entra, Primeiro que Sai)</strong> é essencial para produtos perecíveis e evita perdas.</p>
      
      <h2>Inventário Regular</h2>
      <p>Faça contagens periódicas (mensal ou trimestral) para conferir se o estoque físico confere com o sistema.</p>
      
      <h2>Ponto de Pedido</h2>
      <p>Defina um estoque mínimo para cada produto. Quando atingir esse ponto, faça novo pedido ao fornecedor.</p>
      
      <h2>Sistema Automatizado</h2>
      <p>Um sistema de gestão registra automaticamente cada entrada e saída, dando visibilidade total do seu estoque em tempo real.</p>
    `,
    author: { name: "Equipe Lógica" },
    category: "Dicas e Tutoriais",
    tags: ["Estoque", "Gestão", "Varejo"],
    coverImage:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=400&fit=crop",
    publishedAt: "2026-02-22",
    readTime: 6,
    views: 298,
  },
];

// Função helper para buscar posts
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter((post) => {
    const category = blogCategories.find((cat) => cat.name === post.category);
    return category?.slug === categorySlug;
  });
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return [...blogPosts]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
};

/** Retorna categoria pelo slug ou undefined */
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return blogCategories.find((c) => c.slug === slug);
};

/** Retorna categoria pelo nome (ex: post.category) */
export const getCategoryByName = (name: string): Category | undefined => {
  return blogCategories.find((c) => c.name === name);
};

/** Retorna todos os posts ordenados por data (mais recente primeiro) */
export const getPostsSortedByDate = (): BlogPost[] => {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

/** Formata data para exibição (ex: "5 de mar. de 2026") */
export const formatPostDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
