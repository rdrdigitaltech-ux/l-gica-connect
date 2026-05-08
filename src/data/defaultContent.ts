// ─────────────────────────────────────────────────────────────────────────────
// Conteúdo padrão do site
// Este arquivo é a "fonte da verdade" dos textos, imagens e cores.
// O painel admin lê e escreve sobre estes valores via localStorage.
// ─────────────────────────────────────────────────────────────────────────────

export type ContentType = "text" | "image_url" | "color" | "link" | "boolean";

export interface ContentField {
  label: string;
  value: string;
  type: ContentType;
}

export type SectionMeta = Record<string, ContentField>;
export type AllContentMeta = Record<string, SectionMeta>;

/** Campos opcionais por modelo (card vs. detalhe, filtro, galeria e seções). */
function withCatalogModelExtras(section: SectionMeta, modelCount: number): SectionMeta {
  const extra: SectionMeta = {};
  for (let i = 1; i <= modelCount; i++) {
    extra[`m${i}_desc_resumo`] = {
      label: `Modelo ${i} — Resumo (texto curto só no card)`,
      value: "",
      type: "text",
    };
    extra[`m${i}_desc_detalhe`] = {
      label: `Modelo ${i} — Texto completo (página "Mais detalhes")`,
      value: "",
      type: "text",
    };
    extra[`m${i}_subcategoria`] = {
      label: `Modelo ${i} — Filtro / finalidade (ex.: Etiquetadoras, Bancada)`,
      value: "",
      type: "text",
    };
    extra[`m${i}_imagens_extra`] = {
      label: `Modelo ${i} — Fotos extras na página de detalhes (uma URL por linha)`,
      value: "",
      type: "text",
    };
    extra[`m${i}_secoes_json`] = {
      label: `Modelo ${i} — Seções extras (JSON, opcional)`,
      value: "",
      type: "text",
    };
  }
  return { ...section, ...extra };
}

export const defaultContent: AllContentMeta = {

  // ── HERO (página inicial) ─────────────────────────────────────────────────
  hero: {
    titulo: {
      label: "Título principal",
      value: "Automação Comercial e Informática para Brusque, Blumenau e região",
      type: "text",
    },
    subtitulo: {
      label: "Subtítulo",
      value: "Transforme seu negócio com soluções eficientes e tecnologia avançada.",
      type: "text",
    },
    badge_anos: { label: "Badge — Anos", value: "36 anos", type: "text" },
    badge_clientes: { label: "Badge — Clientes atendidos", value: "52 mil+", type: "text" },
    banner_desktop: { label: "Banner desktop", value: "/img/novobanner-desktop.webp", type: "image_url" },
    banner_tablet: { label: "Banner tablet", value: "/img/novobanner-tablet.webp", type: "image_url" },
    banner_mobile: { label: "Banner mobile", value: "/img/novobanner-mobile.webp", type: "image_url" },
  },

  // ── SOBRE / QUEM SOMOS ────────────────────────────────────────────────────
  sobre: {
    titulo: {
      label: "Título da seção",
      value: "Mais de 3 Décadas Transformando Negócios em Santa Catarina",
      type: "text",
    },
    paragrafo_1: {
      label: "Parágrafo 1",
      value: "Fundada em 1988, a Lógica Informática e Automação Comercial nasceu com um propósito claro: levar tecnologia de ponta para empresas de todos os portes em Santa Catarina. O que começou como uma pequena operação em Brusque se transformou em referência regional em soluções de automação comercial.",
      type: "text",
    },
    paragrafo_2: {
      label: "Parágrafo 2",
      value: "Ao longo de mais de 36 anos, construímos uma trajetória sólida baseada em confiança, inovação e atendimento personalizado. Nossa expertise nos permitiu atender com excelência Centenas de clientes, desde pequenos comércios até grandes redes, sempre com o compromisso de entregar soluções que realmente fazem a diferença no dia a dia dos negócios.",
      type: "text",
    },
    paragrafo_3: {
      label: "Parágrafo 3",
      value: "Como empresa autorizada pelo INMETRO para comercialização e manutenção de balanças, e credenciada pela SEFAZ-SC para impressoras fiscais, garantimos não apenas tecnologia de qualidade, mas também conformidade total com as exigências legais. Hoje, com unidades em Brusque e Blumenau, continuamos expandindo nossa presença e consolidando nosso papel como parceira estratégica na transformação digital das empresas catarinenses.",
      type: "text",
    },
    missao_titulo: { label: "Título — Missão", value: "Nossa Missão", type: "text" },
    missao_texto: {
      label: "Texto da missão",
      value: "Fornecer soluções tecnológicas que simplifiquem a gestão comercial, aumentem a produtividade e impulsionem o crescimento dos nossos clientes através de inovação constante e suporte excepcional.",
      type: "text",
    },
    valores_titulo: { label: "Título — Valores", value: "Nossos Valores", type: "text" },
    valor_confianca: { label: "Valor: Confiança", value: "Relacionamentos duradouros baseados em transparência", type: "text" },
    valor_inovacao: { label: "Valor: Inovação", value: "Sempre à frente com as melhores tecnologias", type: "text" },
    valor_compromisso: { label: "Valor: Compromisso", value: "Suporte dedicado em todas as etapas", type: "text" },
    cert_inmetro: { label: "Certificação — INMETRO", value: "Balanças certificadas", type: "text" },
    cert_sefaz: { label: "Certificação — SEFAZ-SC", value: "Impressoras fiscais", type: "text" },
  },

  // ── NÚMEROS DE IMPACTO ────────────────────────────────────────────────────
  numeros: {
    anos: { label: "Anos de mercado", value: "36", type: "text" },
    clientes_ativos: { label: "Clientes ativos", value: "1250", type: "text" },
    estados: { label: "Estados atendidos", value: "3", type: "text" },
    empresas: { label: "Empresas atendidas", value: "52200", type: "text" },
  },

  // ── SISTEMAS (página /sistemas) ───────────────────────────────────────────
  sistemas: {
    hero_titulo: { label: "Título da página", value: "Sistemas de Gestão Completos", type: "text" },
    hero_subtitulo: { label: "Subtítulo da página", value: "Escolha a solução ideal para o seu segmento", type: "text" },
    secao_titulo: { label: "Título da seção de segmentos", value: "A Lógica tem o sistema ideal para você", type: "text" },
    secao_subtitulo: { label: "Subtítulo da seção", value: "Qual o segmento do seu negócio? Nossos sistemas abrangem estas áreas.", type: "text" },
    varejo_titulo: { label: "Card — Varejo (título)", value: "Comércio & Varejo", type: "text" },
    gastronomia_titulo: { label: "Card — Gastronomia (título)", value: "Bares & Restaurantes", type: "text" },
    multiloja_titulo: { label: "Card — Multiloja (título)", value: "Supermercados & Multilojas", type: "text" },
    outras_titulo: { label: "Título — Outras soluções", value: "Outras Soluções da Lógica", type: "text" },
    outras_subtitulo: { label: "Subtítulo — Outras soluções", value: "Ferramentas para RH, gestão de ponto e organização de atendimentos.", type: "text" },
    ponto_titulo: { label: "Card — Tratamento de Ponto (título)", value: "Tratamento de Ponto", type: "text" },
    ponto_descricao: { label: "Card — Tratamento de Ponto (descrição)", value: "Sistema completo de gestão e apuração de ponto eletrônico com relatórios avançados e integração total.", type: "text" },
    ondesk_titulo: { label: "Card — OnDesk (título)", value: "Lógica.OnDesk", type: "text" },
    ondesk_slogan: { label: "Card — OnDesk (slogan)", value: "Pare de adivinhar. Organize seu atendimento.", type: "text" },
    ondesk_descricao: { label: "Card — OnDesk (descrição)", value: "Central de comando para WhatsApp. Métricas reais, controle total da equipe e produtividade em tempo real.", type: "text" },
    ajuda_texto: { label: "Texto de ajuda (rodapé)", value: "Não encontrou um sistema pra você ou precisa da nossa ajuda para escolhê-lo?", type: "text" },
  },

  // ── SERVIÇOS (página /servicos) ───────────────────────────────────────────
  servicos: {
    hero_titulo: { label: "Título da página", value: "SERVIÇOS", type: "text" },
    hero_subtitulo: {
      label: "Subtítulo da página",
      value: "Ser parceiro da LÓGICA significa ter a certeza e a confiança de que com nossos serviços sua empresa estará continuamente segura e atualizada.",
      type: "text",
    },
    assistencia_titulo: { label: "Título — Assistência Técnica", value: "Assistência técnica especializada", type: "text" },
    assistencia_imagem: { label: "Imagem — Assistência Técnica", value: "/img/assistencia-tecnica.webp", type: "image_url" },
    assistencia_itens: {
      label: "Itens — Assistência (um por linha)",
      value: "Informática em geral\nAutomação comercial em geral\nContrato de manutenção\nBalanças\nImpressoras Térmicas\nNobreak\nNotebook",
      type: "text",
    },
    datacenter_titulo: { label: "Título — Data Center", value: "Soluções de Data Center", type: "text" },
    datacenter_imagem: { label: "Imagem — Data Center", value: "/img/solucoes-datacenter.webp", type: "image_url" },
    datacenter_itens: {
      label: "Itens — Data Center (um por linha)",
      value: "Servidores\nBanco de Dados\nSoluções de backup\nAntivírus\nRedes e cabeamento estruturado\nEstruturas em Rack",
      type: "text",
    },
    software_titulo: { label: "Título — Suporte de Software", value: "Suporte de software", type: "text" },
    software_imagem: { label: "Imagem — Suporte de Software", value: "/img/suporte-software.webp", type: "image_url" },
    software_descricao: {
      label: "Descrição — Suporte de Software",
      value: "Evite a frustração dos suportes 0800. Aqui, com nosso suporte próprio, estamos prontos para atender às suas necessidades tecnológicas, assegurando eficiência e segurança. Entre em contato e experimente a diferença que oferecemos.",
      type: "text",
    },
    cta_titulo: { label: "Título CTA final", value: "Precisa de ajuda com algum serviço?", type: "text" },
    cta_subtitulo: { label: "Subtítulo CTA final", value: "Nossa equipe especializada está pronta para atender você com agilidade e eficiência", type: "text" },
  },

  // ── CONTATO (página /contato) ─────────────────────────────────────────────
  contato: {
    hero_titulo: { label: "Título da página", value: "Entre em Contato", type: "text" },
    hero_subtitulo: { label: "Subtítulo da página", value: "Estamos prontos para atender você. Fale conosco e descubra como podemos transformar seu negócio", type: "text" },
    form_titulo: { label: "Título do formulário", value: "Envie sua Mensagem", type: "text" },
    email: { label: "E-mail de atendimento", value: "atendimento@logica.inf.br", type: "text" },
    whatsapp: { label: "WhatsApp (só dígitos)", value: "5547984218275", type: "text" },
    whatsapp_mensagem: { label: "Mensagem padrão WhatsApp", value: "Olá! Vim pelo site e gostaria de falar com a Lógica", type: "text" },
    telefone_brusque: { label: "Telefone Brusque", value: "(47) 3351-5497", type: "text" },
    telefone_blumenau: { label: "Telefone Blumenau", value: "(47) 3328-0077", type: "text" },
    endereco_brusque: { label: "Endereço Brusque", value: "Av. Dom Joaquim, 437 - Jardim Maluche", type: "text" },
    endereco_blumenau: { label: "Endereço Blumenau", value: "R. Dois de Setembro, 4115 - Itoupava Norte", type: "text" },
    horario: { label: "Horário de atendimento", value: "Segunda a Sexta, 08h às 18h", type: "text" },
    maps_brusque: { label: "Link Google Maps — Brusque", value: "https://www.google.com/maps/dir/?api=1&destination=-27.10681,-48.92285", type: "link" },
    maps_blumenau: { label: "Link Google Maps — Blumenau", value: "https://www.google.com/maps/dir/?api=1&destination=-26.9234,-49.0662", type: "link" },
    formspree_id: { label: "ID Formspree (formulário)", value: "xzdjwzpe", type: "text" },
    redirect_obrigado: { label: "URL de redirecionamento pós-envio", value: "https://l-gica-connect.vercel.app/obrigado", type: "link" },
  },

  // ── RODAPÉ ────────────────────────────────────────────────────────────────
  rodape: {
    descricao: { label: "Descrição do rodapé", value: "Conectando negócios com tecnologia desde 1988. Sua parceira em automação comercial e informática.", type: "text" },
    horario: { label: "Horário no rodapé", value: "Seg-Sex: 08h às 18h", type: "text" },
    copyright: { label: "Texto de copyright", value: "© 2026 Lógica Informática e Automação Comercial. Todos os direitos reservados.", type: "text" },
  },

  // ── GERAL / IDENTIDADE VISUAL ─────────────────────────────────────────────
  geral: {
    nome_empresa: { label: "Nome da empresa", value: "Lógica Informática e Automação Comercial", type: "text" },
    slogan: { label: "Slogan", value: "Conectando negócios com tecnologia", type: "text" },
    logo: { label: "Logo (header)", value: "/img/logo.webp", type: "image_url" },
    logo_rodape: { label: "Logo (rodapé)", value: "/img/logorodape.webp", type: "image_url" },
    cor_primaria: { label: "Cor primária (vermelho)", value: "#FF4757", type: "color" },
    cor_secundaria: { label: "Cor secundária", value: "#E63946", type: "color" },
    cor_fundo: { label: "Cor de fundo", value: "#06080A", type: "color" },
  },

  // ── EQUIPAMENTOS (página /equipamentos e sub-páginas) ────────────────────
  equipamentos: {
    hero_titulo:    { label: "Título da página",   value: "EQUIPAMENTOS",                                                              type: "text" },
    hero_subtitulo: { label: "Subtítulo da página", value: "Os melhores equipamentos de automação e informática. Escolhas inteligentes para o seu negócio.", type: "text" },
    cta_titulo:     { label: "Título CTA",         value: "Precisa de orientação para escolher o equipamento ideal?",                 type: "text" },
    cta_subtitulo:  { label: "Subtítulo CTA",       value: "Nossa equipe está pronta para ajudar você a encontrar a melhor solução para o seu negócio", type: "text" },
    /* Cards das categorias vêm do catálogo hierárquico (painel Equipamentos). */
  },

  // ── BLOG ─────────────────────────────────────────────────────────────────
  blog: {
    hero_titulo: { label: "Título da página de blog", value: "Blog & Notícias", type: "text" },
    hero_subtitulo: { label: "Subtítulo", value: "Dicas, novidades e conteúdo sobre automação comercial e tecnologia.", type: "text" },
    sem_resultados: { label: "Texto quando não há posts", value: "Nenhum post encontrado.", type: "text" },
  },

  // ── PORTAL DO CLIENTE ─────────────────────────────────────────────────────
  portal: {
    login_titulo: { label: "Título da tela de login", value: "Portal do Cliente", type: "text" },
    login_subtitulo: { label: "Subtítulo da tela de login", value: "Acesse sua área exclusiva", type: "text" },
    login_botao: { label: "Texto do botão de login", value: "Entrar", type: "text" },
    login_campo_cnpj: { label: "Label campo CNPJ", value: "CNPJ da empresa", type: "text" },
    login_campo_senha: { label: "Label campo senha", value: "Senha de acesso", type: "text" },
    dashboard_titulo: { label: "Título do dashboard", value: "Bem-vindo ao Portal", type: "text" },
    dashboard_subtitulo: { label: "Subtítulo do dashboard", value: "Aqui você acessa manuais, drivers, tutoriais e treinamentos.", type: "text" },
    solicitar_titulo: { label: "Título — Solicitar acesso", value: "Solicitar Acesso ao Portal", type: "text" },
    solicitar_subtitulo: { label: "Subtítulo — Solicitar acesso", value: "Preencha os dados abaixo para solicitar seu acesso ao portal do cliente.", type: "text" },
  },

  // ── PÁGINA OBRIGADO ───────────────────────────────────────────────────────
  obrigado: {
    titulo: { label: "Título", value: "Mensagem Enviada!", type: "text" },
    subtitulo: { label: "Subtítulo", value: "Em breve nossa equipe entrará em contato com você.", type: "text" },
    botao_voltar: { label: "Texto do botão voltar", value: "Voltar ao início", type: "text" },
  },

  // ── PÁGINA SISTEMA VAREJO ─────────────────────────────────────────────────
  sistema_varejo: {
    hero_badge:    { label: "Badge hero",    value: "Sistema para Comércio & Varejo", type: "text" },
    hero_titulo:   { label: "Título hero",   value: "Implantamos Softwares para Comércio & Varejo em toda Santa Catarina", type: "text" },
    hero_subtitulo:{ label: "Subtítulo hero",value: "Automação e Controle para Comércio e Varejo", type: "text" },
    func_titulo:   { label: "'Como funciona' — Título", value: "Como funciona?", type: "text" },
    func_desc:     { label: "'Como funciona' — Descrição", value: "Nosso software de varejo é a solução de gestão e emissão fiscal mais utilizada no micro e pequeno varejo brasileiro. Completo, estável e com o melhor custo-benefício do mercado, ele atende com excelência o seu negócio.", type: "text" },
    func_imagem:   { label: "Screenshot do sistema", value: "/img/dashboard-varejo.webp", type: "image_url" },
    vant_secao:    { label: "Título seção Vantagens", value: "VANTAGENS", type: "text" },
    v1_titulo: { label: "Vantagem 1 — Título", value: "Documentos Fiscais", type: "text" },
    v1_desc:   { label: "Vantagem 1 — Descrição", value: "Emissão facilitada de documentos como NF-e, NFC-e. Esteja dentro da legislação do seu estado.", type: "text" },
    v2_titulo: { label: "Vantagem 2 — Título", value: "Etiquetas", type: "text" },
    v2_desc:   { label: "Vantagem 2 — Descrição", value: "Gere etiquetas personalizadas para o seu negócio para identificação e organização de produtos.", type: "text" },
    v3_titulo: { label: "Vantagem 3 — Título", value: "Finanças", type: "text" },
    v3_desc:   { label: "Vantagem 3 — Descrição", value: "Acesse facilmente a todos os dados e relatórios que ajudam a deixar o financeiro em dia.", type: "text" },
    v4_titulo: { label: "Vantagem 4 — Título", value: "Controle de estoque", type: "text" },
    v4_desc:   { label: "Vantagem 4 — Descrição", value: "Chega de perder venda por furo no estoque! Use nosso sistema para facilitar o controle.", type: "text" },
    v5_titulo: { label: "Vantagem 5 — Título", value: "PDV Frente de caixa", type: "text" },
    v5_desc:   { label: "Vantagem 5 — Descrição", value: "Simples de usar, intuitivo e ágil. Perfeito para agilizar o atendimento e reduzir filas.", type: "text" },
    v6_titulo: { label: "Vantagem 6 — Título", value: "Pedidos Online", type: "text" },
    v6_desc:   { label: "Vantagem 6 — Descrição", value: "Aumente suas vendas com integração ao Mercado Livre e vendas on-line sem mistério.", type: "text" },
    seg_titulo: { label: "Título — Para quem é?", value: "Para quem é o software?", type: "text" },
    seg_lista:  { label: "Segmentos atendidos (um por linha)", value: "Vestuário\nMicro varejo\nComércio em geral\nPequeno varejo\nMateriais de construção\nMercados\nJoalherias e óticas\nAutopeças", type: "text" },
    seg_imagem: { label: "Imagem seção segmentos", value: "/img/imagem-varejo.jpg", type: "image_url" },
    cta_titulo: { label: "Título CTA final", value: "Pronto para melhorar sua empresa?", type: "text" },
    cta_desc:   { label: "Descrição CTA final", value: "Converse com nossos especialistas e descubra como nosso sistema pode transformar a gestão da sua loja.", type: "text" },
  },

  // ── PÁGINA SISTEMA GASTRONOMIA ────────────────────────────────────────────
  sistema_gastronomia: {
    hero_badge:    { label: "Badge hero",    value: "Sistema para Bares & Restaurantes", type: "text" },
    hero_titulo:   { label: "Título hero",   value: "Software para Bares & Restaurantes", type: "text" },
    hero_subtitulo:{ label: "Subtítulo hero",value: "Otimize seu negócio e aprimore o atendimento ao cliente", type: "text" },
    func_titulo:   { label: "'Como funciona' — Título", value: "Como funciona?", type: "text" },
    func_desc:     { label: "'Como funciona' — Descrição", value: "Oferecemos soluções inteligentes para gestão, atendimento e automação, voltadas à gastronomia e ao entretenimento, simplificando a gestão do seu negócio.", type: "text" },
    func_imagem:   { label: "Screenshot do sistema", value: "/img/dashboard-restaurante.webp", type: "image_url" },
    vant_secao:    { label: "Título seção Vantagens", value: "VANTAGENS", type: "text" },
    v1_titulo: { label: "Vantagem 1 — Título", value: "Gestão", type: "text" },
    v1_desc:   { label: "Vantagem 1 — Descrição", value: "Com nossa solução, a gestão de estoque torna-se setorizada e detalhada, garantindo controle preciso dos insumos e produtos.", type: "text" },
    v2_titulo: { label: "Vantagem 2 — Título", value: "Pesagem", type: "text" },
    v2_desc:   { label: "Vantagem 2 — Descrição", value: "O processo de pesagem é ágil e eficiente, com autoatendimento na balança que reduz filas e elimina erros.", type: "text" },
    v3_titulo: { label: "Vantagem 3 — Título", value: "Cozinha", type: "text" },
    v3_desc:   { label: "Vantagem 3 — Descrição", value: "Distribua pedidos em diversos pontos da cozinha, segmentando por tipo de alimento, otimizando a produção e entrega.", type: "text" },
    v4_titulo: { label: "Vantagem 4 — Título", value: "Pedidos", type: "text" },
    v4_desc:   { label: "Vantagem 4 — Descrição", value: "Garçons automatizados com lançamentos de pedidos através de celular ou tablet. Personalize e detalhe pedidos de forma rápida e eficaz.", type: "text" },
    v5_titulo: { label: "Vantagem 5 — Título", value: "Reservas", type: "text" },
    v5_desc:   { label: "Vantagem 5 — Descrição", value: "A gestão de mesas é avançada, com recursos de reservas, agrupamentos e pagamentos parciais, melhorando a experiência do cliente.", type: "text" },
    v6_titulo: { label: "Vantagem 6 — Título", value: "Pagamentos", type: "text" },
    v6_desc:   { label: "Vantagem 6 — Descrição", value: "Agrupe comandas para pagamento com facilidade, otimizando o fluxo de atendimento e reduzindo tempos de espera no caixa.", type: "text" },
    seg_titulo: { label: "Título — Para quem é?", value: "Para quem?", type: "text" },
    seg_lista:  { label: "Segmentos atendidos (um por linha)", value: "Locais executivos\nRestaurantes à la carte\nRestaurantes com buffet\nCozinhas orientais\nRestaurantes típicos\nBares e choperias\nPizzarias\nCafeterias", type: "text" },
    seg_imagem: { label: "Imagem seção segmentos", value: "/img/gastronomia-segmentos.webp", type: "image_url" },
    cta_titulo: { label: "Título CTA final", value: "Pronto para transformar seu negócio?", type: "text" },
    cta_desc:   { label: "Descrição CTA final", value: "Fale com nossa equipe e descubra como simplificar a gestão do seu restaurante.", type: "text" },
  },

  // ── PÁGINA SISTEMA MULTILOJA ──────────────────────────────────────────────
  sistema_multiloja: {
    hero_badge:    { label: "Badge hero",    value: "Sistema para Supermercados & Multilojas", type: "text" },
    hero_titulo:   { label: "Título hero",   value: "Software para Supermercados & Multilojas", type: "text" },
    hero_subtitulo:{ label: "Subtítulo hero",value: "Automação e Eficiência em Diversos Segmentos", type: "text" },
    func_titulo:   { label: "'Como funciona' — Título", value: "Como funciona?", type: "text" },
    func_desc:     { label: "'Como funciona' — Descrição", value: "Este software traz uma solução personalizada para cada negócio, por isso seu uso é considerado multiloja, buscando atender às necessidades específicas de cada empresa. É possível a implementação de funcionalidades, ferramentas e mais, de acordo com o segmento onde a loja atua.", type: "text" },
    func_imagem:   { label: "Screenshot do sistema", value: "/img/dashboard-multiloja.webp", type: "image_url" },
    vant_secao:    { label: "Título seção Vantagens", value: "VANTAGENS", type: "text" },
    v1_titulo: { label: "Vantagem 1 — Título", value: "Personalizado", type: "text" },
    v1_desc:   { label: "Vantagem 1 — Descrição", value: "Adequação de funcionalidades requeridas por qualquer tipo de loja ou negócio.", type: "text" },
    v2_titulo: { label: "Vantagem 2 — Título", value: "Gerenciamento", type: "text" },
    v2_desc:   { label: "Vantagem 2 — Descrição", value: "Permite gerenciar filiais, centralizando a gestão da empresa.", type: "text" },
    v3_titulo: { label: "Vantagem 3 — Título", value: "Documentos Fiscais", type: "text" },
    v3_desc:   { label: "Vantagem 3 — Descrição", value: "Emissão facilitada de documentos como NF-e, NFC-e. Esteja dentro da legislação do seu estado.", type: "text" },
    v4_titulo: { label: "Vantagem 4 — Título", value: "Controle de estoque", type: "text" },
    v4_desc:   { label: "Vantagem 4 — Descrição", value: "Chega de perder venda por furo no estoque! Use nosso sistema para facilitar o controle.", type: "text" },
    v5_titulo: { label: "Vantagem 5 — Título", value: "PDV Frente de caixa", type: "text" },
    v5_desc:   { label: "Vantagem 5 — Descrição", value: "Simples de usar, intuitivo e ágil. Perfeito para agilizar o atendimento e reduzir filas.", type: "text" },
    v6_titulo: { label: "Vantagem 6 — Título", value: "Finanças", type: "text" },
    v6_desc:   { label: "Vantagem 6 — Descrição", value: "Acesse facilmente a todos os dados e relatórios que ajudam a deixar o financeiro em dia.", type: "text" },
    seg_titulo: { label: "Título — Para quem é?", value: "Para quem é o software?", type: "text" },
    seg_lista:  { label: "Segmentos atendidos (um por linha)", value: "Departamentos variados\nAutopeças\nLojas com filiais\nSupermercados\nEmpresas de transporte\nDistribuidoras\nConstrutoras\nFarmácias", type: "text" },
    seg_imagem: { label: "Imagem seção segmentos", value: "/img/shopping-erp.webp", type: "image_url" },
    cta_titulo: { label: "Título CTA final", value: "Pronto para expandir sua empresa?", type: "text" },
    cta_desc:   { label: "Descrição CTA final", value: "Converse com nossos especialistas e descubra como nosso sistema pode centralizar a gestão de suas lojas.", type: "text" },
  },

  // ── PÁGINA SISTEMA TRATAMENTO DE PONTO ───────────────────────────────────
  sistema_ponto: {
    hero_badge:    { label: "Badge hero",    value: "Sistema de Tratamento de Ponto", type: "text" },
    hero_titulo:   { label: "Título hero",   value: "Sistema de controle de ponto para RH", type: "text" },
    hero_subtitulo:{ label: "Subtítulo hero",value: "Sistema profissional de tratamento de ponto que automatiza a gestão de jornadas, reduz erros e reforça a conformidade com a legislação trabalhista. Relatórios inteligentes e integração com folha de pagamento.", type: "text" },
    func_secao_titulo: { label: "Título seção Funcionalidades", value: "Funcionalidades principais", type: "text" },
    func_secao_desc:   { label: "Descrição seção Funcionalidades", value: "Tudo o que você precisa para uma apuração completa e uma rotina de RH mais eficiente.", type: "text" },
    f1_titulo: { label: "Funcionalidade 1 — Título", value: "Apuração Automática de Ponto", type: "text" },
    f1_desc:   { label: "Funcionalidade 1 — Descrição", value: "Cálculo automático de horas trabalhadas, extras, faltas e atrasos com precisão e consistência.", type: "text" },
    f2_titulo: { label: "Funcionalidade 2 — Título", value: "Gestão de Jornadas", type: "text" },
    f2_desc:   { label: "Funcionalidade 2 — Descrição", value: "Controle de escalas, turnos e horários flexíveis, com parametrizações adaptadas à sua operação.", type: "text" },
    f3_titulo: { label: "Funcionalidade 3 — Título", value: "Relatórios Gerenciais", type: "text" },
    f3_desc:   { label: "Funcionalidade 3 — Descrição", value: "Indicadores e visões consolidadas para produtividade, absenteísmo, horas extras e tendências.", type: "text" },
    f4_titulo: { label: "Funcionalidade 4 — Título", value: "Integração com Folha", type: "text" },
    f4_desc:   { label: "Funcionalidade 4 — Descrição", value: "Exportação de dados para sistemas de folha de pagamento, reduzindo retrabalho e inconsistências.", type: "text" },
    f5_titulo: { label: "Funcionalidade 5 — Título", value: "Conformidade Legal", type: "text" },
    f5_desc:   { label: "Funcionalidade 5 — Descrição", value: "Apoio à conformidade com a Portaria 671 e rotinas do departamento pessoal, com trilhas e relatórios.", type: "text" },
    f6_titulo: { label: "Funcionalidade 6 — Título", value: "Tratamento de Exceções", type: "text" },
    f6_desc:   { label: "Funcionalidade 6 — Descrição", value: "Gestão de atestados, férias, folgas e justificativas com fluxo de validação e histórico.", type: "text" },
    f7_titulo: { label: "Funcionalidade 7 — Título", value: "Acesso Web e Mobile", type: "text" },
    f7_desc:   { label: "Funcionalidade 7 — Descrição", value: "Gestores e colaboradores acessam de qualquer lugar para consultas, ajustes e aprovações.", type: "text" },
    f8_titulo: { label: "Funcionalidade 8 — Título", value: "Banco de Horas", type: "text" },
    f8_desc:   { label: "Funcionalidade 8 — Descrição", value: "Controle de banco de horas positivo e negativo com regras claras e visibilidade por período.", type: "text" },
    ben_secao_titulo: { label: "Título seção Benefícios", value: "Benefícios reais para o RH", type: "text" },
    ben_secao_desc:   { label: "Descrição seção Benefícios", value: "Menos tempo com planilhas, mais controle e mais previsibilidade.", type: "text" },
    b1_titulo: { label: "Benefício 1 — Título", value: "Fechamento muito mais rápido", type: "text" },
    b1_desc:   { label: "Benefício 1 — Descrição", value: "Reduza drasticamente o tempo de fechamento do ponto com apuração automatizada.", type: "text" },
    b2_titulo: { label: "Benefício 2 — Título", value: "Mais segurança e conformidade", type: "text" },
    b2_desc:   { label: "Benefício 2 — Descrição", value: "Padronize rotinas e tenha rastreabilidade para auditorias e conferências internas.", type: "text" },
    b3_titulo: { label: "Benefício 3 — Título", value: "Decisões com dados", type: "text" },
    b3_desc:   { label: "Benefício 3 — Descrição", value: "Acompanhe indicadores para agir rápido em atrasos, faltas e gargalos operacionais.", type: "text" },
    b4_titulo: { label: "Benefício 4 — Título", value: "Menos retrabalho no RH", type: "text" },
    b4_desc:   { label: "Benefício 4 — Descrição", value: "Evite cálculos manuais e exporte informações prontas para a folha de pagamento.", type: "text" },
    cta_titulo: { label: "Título CTA final", value: "Quer automatizar o fechamento do ponto?", type: "text" },
    cta_desc:   { label: "Descrição CTA final", value: "A Lógica comercializa e implanta soluções de tratamento de ponto com foco em resultado, conformidade e suporte de verdade.", type: "text" },
    // Galeria de imagens do sistema
    galeria_titulo: { label: "Galeria — Título da seção", value: "Conheça o Sistema", type: "text" },
    img1: { label: "Galeria — Imagem 1", value: "", type: "image_url" },
    img2: { label: "Galeria — Imagem 2", value: "", type: "image_url" },
    img3: { label: "Galeria — Imagem 3", value: "", type: "image_url" },
    img4: { label: "Galeria — Imagem 4", value: "", type: "image_url" },
  },

  // ── PÁGINA SISTEMA ONDESK ─────────────────────────────────────────────────
  sistema_ondesk: {
    hero_badge:    { label: "Badge hero",    value: "Lógica.OnDesk", type: "text" },
    hero_titulo:   { label: "Título hero",   value: "Pare de adivinhar. Organize seu atendimento e acelere resultados.", type: "text" },
    hero_subtitulo:{ label: "Subtítulo hero",value: "Transforme o caos do WhatsApp em métricas reais. Tenha controle total da equipe em uma única tela, monitore produtividade em tempo real e tome decisões rápidas com a sua nova central de comando.", type: "text" },
    func_secao_titulo: { label: "Título seção Funcionalidades", value: "O que você ganha com o OnDesk", type: "text" },
    func_secao_desc:   { label: "Descrição seção Funcionalidades", value: "Tudo que um time de atendimento precisa, em uma única plataforma.", type: "text" },
    f1_titulo: { label: "Funcionalidade 1 — Título", value: "Central Unificada", type: "text" },
    f1_desc:   { label: "Funcionalidade 1 — Descrição", value: "Todos os atendimentos do WhatsApp em uma única interface organizada e simples de operar.", type: "text" },
    f2_titulo: { label: "Funcionalidade 2 — Título", value: "Métricas em Tempo Real", type: "text" },
    f2_desc:   { label: "Funcionalidade 2 — Descrição", value: "Acompanhe tempo de resposta, volume de atendimentos e performance do time ao vivo.", type: "text" },
    f3_titulo: { label: "Funcionalidade 3 — Título", value: "Gestão de Equipe", type: "text" },
    f3_desc:   { label: "Funcionalidade 3 — Descrição", value: "Distribua atendimentos, monitore performance e identifique gargalos com clareza.", type: "text" },
    f4_titulo: { label: "Funcionalidade 4 — Título", value: "Automação Inteligente", type: "text" },
    f4_desc:   { label: "Funcionalidade 4 — Descrição", value: "Respostas rápidas, tags e fluxos de atendimento para padronizar qualidade e velocidade.", type: "text" },
    f5_titulo: { label: "Funcionalidade 5 — Título", value: "Histórico Completo", type: "text" },
    f5_desc:   { label: "Funcionalidade 5 — Descrição", value: "Converse com contexto: histórico pesquisável e organizado para cada cliente e atendimento.", type: "text" },
    f6_titulo: { label: "Funcionalidade 6 — Título", value: "Relatórios Avançados", type: "text" },
    f6_desc:   { label: "Funcionalidade 6 — Descrição", value: "Dashboards e relatórios para decisões baseadas em dados, não em achismos.", type: "text" },
    f7_titulo: { label: "Funcionalidade 7 — Título", value: "Operação com Controle", type: "text" },
    f7_desc:   { label: "Funcionalidade 7 — Descrição", value: "Visão do que está acontecendo agora: filas, responsáveis, prioridades e status.", type: "text" },
    f8_titulo: { label: "Funcionalidade 8 — Título", value: "Múltiplos Atendentes", type: "text" },
    f8_desc:   { label: "Funcionalidade 8 — Descrição", value: "Vários atendentes trabalhando ao mesmo tempo com rastreabilidade e controle de distribuição.", type: "text" },
    ben_secao_titulo: { label: "Título seção Resultados", value: "Resultados esperados", type: "text" },
    b1_valor:  { label: "Resultado 1 — Métrica", value: "40%", type: "text" },
    b1_titulo: { label: "Resultado 1 — Título", value: "Mais conversões", type: "text" },
    b1_desc:   { label: "Resultado 1 — Descrição", value: "Atendimento organizado tende a vender mais", type: "text" },
    b2_valor:  { label: "Resultado 2 — Métrica", value: "60%", type: "text" },
    b2_titulo: { label: "Resultado 2 — Título", value: "Respostas mais rápidas", type: "text" },
    b2_desc:   { label: "Resultado 2 — Descrição", value: "Menos espera, mais satisfação do cliente", type: "text" },
    b3_valor:  { label: "Resultado 3 — Métrica", value: "0", type: "text" },
    b3_titulo: { label: "Resultado 3 — Título", value: "Atendimentos perdidos", type: "text" },
    b3_desc:   { label: "Resultado 3 — Descrição", value: "Controle de fila e acompanhamento por status", type: "text" },
    b4_valor:  { label: "Resultado 4 — Métrica", value: "100%", type: "text" },
    b4_titulo: { label: "Resultado 4 — Título", value: "Visibilidade do time", type: "text" },
    b4_desc:   { label: "Resultado 4 — Descrição", value: "Produtividade e métricas em uma tela", type: "text" },
    ad1_antes:  { label: "Antes x Depois 1 — Antes",  value: "Conversas perdidas no meio da bagunça", type: "text" },
    ad1_depois: { label: "Antes x Depois 1 — Depois", value: "Atendimentos organizados e rastreáveis", type: "text" },
    ad2_antes:  { label: "Antes x Depois 2 — Antes",  value: "Sem saber quem está atendendo o quê", type: "text" },
    ad2_depois: { label: "Antes x Depois 2 — Depois", value: "Visão completa do time em tempo real", type: "text" },
    ad3_antes:  { label: "Antes x Depois 3 — Antes",  value: "Impossível medir produtividade", type: "text" },
    ad3_depois: { label: "Antes x Depois 3 — Depois", value: "Métricas por atendente e por fila", type: "text" },
    ad4_antes:  { label: "Antes x Depois 4 — Antes",  value: "Decisões no escuro", type: "text" },
    ad4_depois: { label: "Antes x Depois 4 — Depois", value: "Decisões baseadas em dados reais", type: "text" },
    cta_titulo: { label: "Título CTA final", value: "Pronto para organizar seu atendimento?", type: "text" },
    cta_desc:   { label: "Descrição CTA final", value: "A Lógica comercializa e implanta o Lógica.OnDesk com suporte completo e treinamento da equipe.", type: "text" },
    // Galeria de imagens do sistema
    galeria_titulo: { label: "Galeria — Título da seção", value: "Conheça o Sistema", type: "text" },
    img1: { label: "Galeria — Imagem 1", value: "", type: "image_url" },
    img2: { label: "Galeria — Imagem 2", value: "", type: "image_url" },
    img3: { label: "Galeria — Imagem 3", value: "", type: "image_url" },
    img4: { label: "Galeria — Imagem 4", value: "", type: "image_url" },
  },

  // ── CATÁLOGO — BALANÇAS ───────────────────────────────────────────────────
  catalogo_balancas: withCatalogModelExtras({
    video_url: { label: "Vídeo Tutorial geral — URL do YouTube", value: "", type: "link" },
    m1_nome:      { label: "Modelo 1 — Nome  (Toledo Prix 3 Fit)",       value: "Balança Toledo Prix 3 Fit",   type: "text" },
    m1_img:       { label: "Modelo 1 — Imagem (Toledo Prix 3 Fit)",      value: "/img/Prix 3 Fit.webp",        type: "image_url" },
    m1_desc:      { label: "Modelo 1 — Descrição (Toledo Prix 3 Fit)",   value: "Balança eletrônica compacta com impressora integrada, ideal para açougues, feiras e supermercados. Display amplo e fácil leitura.", type: "text" },
    m1_video_url: { label: "Modelo 1 — Vídeo YouTube (Toledo Prix 3 Fit)", value: "", type: "link" },
    m2_nome:      { label: "Modelo 2 — Nome  (Toledo Prix 4 Uno)",       value: "Balança Toledo Prix 4 Uno",   type: "text" },
    m2_img:       { label: "Modelo 2 — Imagem (Toledo Prix 4 Uno)",      value: "/img/Prix 4 Uno (4).webp",   type: "image_url" },
    m2_desc:      { label: "Modelo 2 — Descrição (Toledo Prix 4 Uno)",   value: "Modelo avançado com conectividade USB e impressão térmica de alta velocidade. Perfeita para ambientes de alto fluxo e pesagem precisa.", type: "text" },
    m2_video_url: { label: "Modelo 2 — Vídeo YouTube (Toledo Prix 4 Uno)", value: "", type: "link" },
    m3_nome:      { label: "Modelo 3 — Nome  (Urano US 31)",             value: "Balança Urano US 31",        type: "text" },
    m3_img:       { label: "Modelo 3 — Imagem (Urano US 31)",            value: "/img/Urano US 31 2.webp",    type: "image_url" },
    m3_desc:      { label: "Modelo 3 — Descrição (Urano US 31)",         value: "Balança de plataforma robusta para pesagem comercial. Estrutura reforçada, alta precisão e display de fácil leitura.", type: "text" },
    m3_video_url: { label: "Modelo 3 — Vídeo YouTube (Urano US 31)",     value: "", type: "link" },
  }, 3),

  // ── CATÁLOGO — LEITORES DE CÓDIGO DE BARRAS ───────────────────────────────
  catalogo_leitores: withCatalogModelExtras({
    video_url:    { label: "Vídeo Tutorial geral — URL do YouTube", value: "", type: "link" },
    m1_nome:      { label: "Leitor 1 — Nome  (Elgin QW 2120)",          value: "Leitor Elgin QW 2120",       type: "text" },
    m1_img:       { label: "Leitor 1 — Imagem (Elgin QW 2120)",         value: "/img/Elgin QW 2120.webp",    type: "image_url" },
    m1_desc:      { label: "Leitor 1 — Descrição (Elgin QW 2120)",      value: "Scanner compacto e ergonômico com leitura omnidirecional. Conexão USB plug-and-play. Alta velocidade de captura para agilizar vendas.", type: "text" },
    m1_video_url: { label: "Leitor 1 — Vídeo YouTube (Elgin QW 2120)",  value: "", type: "link" },
    m2_nome:      { label: "Leitor 2 — Nome  (Tectoy 2D FD-120)",       value: "Leitor Tectoy 2D FD-120",    type: "text" },
    m2_img:       { label: "Leitor 2 — Imagem (Tectoy 2D FD-120)",      value: "/img/Tectoy 2D FD-120.webp", type: "image_url" },
    m2_desc:      { label: "Leitor 2 — Descrição (Tectoy 2D FD-120)",   value: "Leitor 2D fixo para PDV com excelente custo-benefício. Leitura de códigos de barras e QR Code. Ideal para checkout.", type: "text" },
    m2_video_url: { label: "Leitor 2 — Vídeo YouTube (Tectoy 2D FD-120)", value: "", type: "link" },
    m3_nome:      { label: "Leitor 3 — Nome  (Bematech BR400i)",         value: "Bematech BR400i",            type: "text" },
    m3_img:       { label: "Leitor 3 — Imagem (Bematech BR400i)",        value: "/img/Bematech BR400i.webp",  type: "image_url" },
    m3_desc:      { label: "Leitor 3 — Descrição (Bematech BR400i)",     value: "Amplamente utilizado em supermercados, lojas de roupas e farmácias para registrar rapidamente as informações de produtos, agilizando o atendimento ao cliente.", type: "text" },
    m3_video_url: { label: "Leitor 3 — Vídeo YouTube (Bematech BR400i)", value: "", type: "link" },
    m4_nome:      { label: "Leitor 4 — Nome  (Bematech CCD BR-420)",     value: "Bematech CCD BR-420",        type: "text" },
    m4_img:       { label: "Leitor 4 — Imagem (Bematech CCD BR-420)",    value: "/img/Bematech CCD BR-420.webp", type: "image_url" },
    m4_desc:      { label: "Leitor 4 — Descrição (Bematech CCD BR-420)", value: "Modelo de entrada rápido, com 100 leituras por segundo, ideal para ler códigos de produtos, DANFEs e boletos, com alta resistência a quedas (até 1,5m).", type: "text" },
    m4_video_url: { label: "Leitor 4 — Vídeo YouTube (Bematech CCD BR-420)", value: "", type: "link" },
    m5_nome:      { label: "Leitor 5 — Nome  (Elgin EL-250)",            value: "Elgin EL-250",               type: "text" },
    m5_img:       { label: "Leitor 5 — Imagem (Elgin EL-250)",           value: "/img/Elgin EL-250.webp",     type: "image_url" },
    m5_desc:      { label: "Leitor 5 — Descrição (Elgin EL-250)",        value: "Equipamento Elgin para automação comercial. Compacto e versátil para integração com sistemas de PDV.", type: "text" },
    m5_video_url: { label: "Leitor 5 — Vídeo YouTube (Elgin EL-250)",    value: "", type: "link" },
  }, 5),

  // ── CATÁLOGO — IMPRESSORAS ────────────────────────────────────────────────
  catalogo_impressoras: withCatalogModelExtras({
    video_url:     { label: "Vídeo Tutorial geral — URL do YouTube", value: "", type: "link" },
    m1_nome:       { label: "Impressora 1 — Nome  (Elgin L-42 PRO)",            value: "Elgin L-42 PRO",              type: "text" },
    m1_img:        { label: "Impressora 1 — Imagem (Elgin L-42 PRO)",           value: "/img/Elgin L-42 PRO.webp",    type: "image_url" },
    m1_desc:       { label: "Impressora 1 — Descrição (Elgin L-42 PRO)",        value: "Computador PDV all-in-one com tela touch, processador Intel e sistema operacional Windows. Solução completa para varejo e automação comercial.", type: "text" },
    m1_video_url:  { label: "Impressora 1 — Vídeo YouTube (Elgin L-42 PRO)",    value: "", type: "link" },
    m2_nome:       { label: "Impressora 2 — Nome  (Argox OS 214 Plus)",         value: "Argox OS 214 Plus",           type: "text" },
    m2_img:        { label: "Impressora 2 — Imagem (Argox OS 214 Plus)",        value: "/img/Argox OS 214 Plus.webp", type: "image_url" },
    m2_desc:       { label: "Impressora 2 — Descrição (Argox OS 214 Plus)",     value: "Leitor 2D de alta performance com leitura omnidirecional. Lê códigos de barras e QR Code em superfícies diversas. Ideal para varejo.", type: "text" },
    m2_video_url:  { label: "Impressora 2 — Vídeo YouTube (Argox OS 214 Plus)", value: "", type: "link" },
    m3_nome:       { label: "Impressora 3 — Nome  (Elgin i8)",                   value: "Impressora Elgin i8",         type: "text" },
    m3_img:        { label: "Impressora 3 — Imagem (Elgin i8)",                  value: "/img/Elgin i8 (2).webp",      type: "image_url" },
    m3_desc:       { label: "Impressora 3 — Descrição (Elgin i8)",               value: "Impressora fiscal térmica homologada pela SEFAZ. Impressão rápida de cupons fiscais e notas. Solução econômica para pequenos varejistas.", type: "text" },
    m3_video_url:  { label: "Impressora 3 — Vídeo YouTube (Elgin i8)",           value: "", type: "link" },
    m4_nome:       { label: "Impressora 4 — Nome  (Elgin i9)",                   value: "Impressora Elgin i9",         type: "text" },
    m4_img:        { label: "Impressora 4 — Imagem (Elgin i9)",                  value: "/img/Elgin i9.webp",          type: "image_url" },
    m4_desc:       { label: "Impressora 4 — Descrição (Elgin i9)",               value: "Impressora fiscal térmica homologada pela SEFAZ. Impressão rápida e silenciosa de cupons e notas. Alta durabilidade.", type: "text" },
    m4_video_url:  { label: "Impressora 4 — Vídeo YouTube (Elgin i9)",           value: "", type: "link" },
    m5_nome:       { label: "Impressora 5 — Nome  (Bematech MP 4200)",           value: "Impressora Bematech MP 4200", type: "text" },
    m5_img:        { label: "Impressora 5 — Imagem (Bematech MP 4200)",          value: "/img/Bematech MP 4200.webp",  type: "image_url" },
    m5_desc:       { label: "Impressora 5 — Descrição (Bematech MP 4200)",       value: "Impressora fiscal de mesa com ampla compatibilidade. Ideal para supermercados, farmácias e comércio em geral.", type: "text" },
    m5_video_url:  { label: "Impressora 5 — Vídeo YouTube (Bematech MP 4200)",   value: "", type: "link" },
    m6_nome:       { label: "Impressora 6 — Nome  (Epson TM-T20X)",              value: "Impressora Epson TM-T20X",    type: "text" },
    m6_img:        { label: "Impressora 6 — Imagem (Epson TM-T20X)",             value: "/img/Epson TM- T20X.webp",   type: "image_url" },
    m6_desc:       { label: "Impressora 6 — Descrição (Epson TM-T20X)",          value: "Impressora não-fiscal térmica de alta velocidade. Ideal para impressão de recibos e comandos. Silenciosa e confiável.", type: "text" },
    m6_video_url:  { label: "Impressora 6 — Vídeo YouTube (Epson TM-T20X)",      value: "", type: "link" },
    m7_nome:       { label: "Impressora 7 — Nome  (Zebra ZT231)",                value: "Zebra ZT231",                 type: "text" },
    m7_img:        { label: "Impressora 7 — Imagem (Zebra ZT231)",               value: "/img/ZT231 – Impressora industrial padrão de 4 polegadas.webp", type: "image_url" },
    m7_desc:       { label: "Impressora 7 — Descrição (Zebra ZT231)",            value: "Impressora industrial de mesa, padrão de 4 polegadas, indicada para etiquetas em produção, expedição e automação com demanda contínua.", type: "text" },
    m7_video_url:  { label: "Impressora 7 — Vídeo YouTube (Zebra ZT231)",        value: "", type: "link" },
    m8_nome:       { label: "Impressora 8 — Nome  (Zebra ZT411)",                value: "Zebra ZT411",                 type: "text" },
    m8_img:        { label: "Impressora 8 — Imagem (Zebra ZT411)",               value: "/img/ZT411.webp",             type: "image_url" },
    m8_desc:       { label: "Impressora 8 — Descrição (Zebra ZT411)",            value: "Impressora industrial para etiquetas e codificação em ambientes de produção, logística e varejo com maior demanda de volume.", type: "text" },
    m8_video_url:  { label: "Impressora 8 — Vídeo YouTube (Zebra ZT411)",        value: "", type: "link" },
    m9_nome:       { label: "Impressora 9 — Nome  (Zebra ZT411 Linerless)",      value: "Zebra ZT411 Linerless",       type: "text" },
    m9_img:        { label: "Impressora 9 — Imagem (Zebra ZT411 Linerless)",     value: "/img/ZT411 Linerless.webp",   type: "image_url" },
    m9_desc:       { label: "Impressora 9 — Descrição (Zebra ZT411 Linerless)",  value: "Versão voltada a mídia linerless, reduzindo resíduos de papel cristal e agilizando troca de rolo em linhas contínuas.", type: "text" },
    m9_video_url:  { label: "Impressora 9 — Vídeo YouTube (Zebra ZT411 Linerless)", value: "", type: "link" },
    m10_nome:      { label: "Impressora 10 — Nome  (Zebra ZT411 RFID)",          value: "Zebra ZT411 RFID",            type: "text" },
    m10_img:       { label: "Impressora 10 — Imagem (Zebra ZT411 RFID)",         value: "/img/ZT411 RFID.webp",        type: "image_url" },
    m10_desc:      { label: "Impressora 10 — Descrição (Zebra ZT411 RFID)",      value: "Solução com gravação e impressão RFID, pensada para rastreabilidade, inventário e cadeias que exigem identificação por radiofrequência.", type: "text" },
    m10_video_url: { label: "Impressora 10 — Vídeo YouTube (Zebra ZT411 RFID)", value: "", type: "link" },
    m11_nome:      { label: "Impressora 11 — Nome  (Zebra ZT421)",               value: "Zebra ZT421",                 type: "text" },
    m11_img:       { label: "Impressora 11 — Imagem (Zebra ZT421)",              value: "/img/ZT421.webp",             type: "image_url" },
    m11_desc:      { label: "Impressora 11 — Descrição (Zebra ZT421)",           value: "Modelo industrial com foco em largura útil ampliada para etiquetas maiores, sinalização e aplicações de expedição.", type: "text" },
    m11_video_url: { label: "Impressora 11 — Vídeo YouTube (Zebra ZT421)",       value: "", type: "link" },
    m12_nome:      { label: "Impressora 12 — Nome  (Zebra ZT421 RFID)",          value: "Zebra ZT421 RFID",            type: "text" },
    m12_img:       { label: "Impressora 12 — Imagem (Zebra ZT421 RFID)",         value: "/img/ZT421 RFID.webp",        type: "image_url" },
    m12_desc:      { label: "Impressora 12 — Descrição (Zebra ZT421 RFID)",      value: "Combina impressão de grande formato com codificação RFID para operações que integram identificação visual e eletrônica.", type: "text" },
    m12_video_url: { label: "Impressora 12 — Vídeo YouTube (Zebra ZT421 RFID)", value: "", type: "link" },
  }, 12),

  // ── CATÁLOGO — RELÓGIOS DE PONTO E CATRACAS ───────────────────────────────
  catalogo_relogio: withCatalogModelExtras({
    video_url: { label: "Vídeo Tutorial — URL do YouTube", value: "", type: "link" },
    m1_nome:  { label: "Produto 1 — Nome  (Control iD)",              value: "Relógio de Ponto Control iD",             type: "text" },
    m1_img:   { label: "Produto 1 — Imagem (Control iD)",             value: "/img/RELOGIO PONTO CONTROL ID.webp",      type: "image_url" },
    m1_desc:  { label: "Produto 1 — Descrição (Control iD)", value: "Terminal de ponto com reconhecimento biométrico e tela colorida. Registro seguro de jornada e controle de acesso. Conectividade via rede.", type: "text" },
    m2_nome:  { label: "Produto 2 — Nome  (iDFace)",                  value: "Relógio de Ponto iDFace",                 type: "text" },
    m2_img:   { label: "Produto 2 — Imagem (iDFace)",                 value: "/img/idface-frontal.webp",                type: "image_url" },
    m2_desc:  { label: "Produto 2 — Descrição (iDFace)", value: "Terminal com reconhecimento facial e interface em tela sensível ao toque, pensado para registro rápido de jornada e reforço da segurança no controle de acesso.", type: "text" },
    m3_nome:  { label: "Produto 3 — Nome  (Torniquete)",              value: "Torniquete de controle de acesso",        type: "text" },
    m3_img:   { label: "Produto 3 — Imagem (Torniquete)",             value: "/img/torniquete-list.webp",               type: "image_url" },
    m3_desc:  { label: "Produto 3 — Descrição (Torniquete)", value: "Catraca para fluxo de entrada e saída, indicada para registro de presença e controle de circulação em empresas e condomínios.", type: "text" },
    m4_nome:  { label: "Produto 4 — Nome  (Torniquete Facial)",       value: "Torniquete com reconhecimento facial",    type: "text" },
    m4_img:   { label: "Produto 4 — Imagem (Torniquete Facial)",      value: "/img/torniquete-facial-list.webp",        type: "image_url" },
    m4_desc:  { label: "Produto 4 — Descrição (Torniquete Facial)", value: "Solução de catraca com módulo biométrico facial para liberação sem contato, alinhada a políticas de segurança e registro de jornada.", type: "text" },
    m5_nome:  { label: "Produto 5 — Nome  (Torniquete iDFace Max)",   value: "Torniquete facial idFace Max",            type: "text" },
    m5_img:   { label: "Produto 5 — Imagem (Torniquete iDFace Max)",  value: "/img/torniquete-facial-idface-max-list.webp", type: "image_url" },
    m5_desc:  { label: "Produto 5 — Descrição (Torniquete iDFace Max)", value: "Configuração voltada a alto fluxo, com leitor facial de desempenho elevado.", type: "text" },
    m6_nome:  { label: "Produto 6 — Nome  (idBlock Balcão)",          value: "idBlock Balcão",                         type: "text" },
    m6_img:   { label: "Produto 6 — Imagem (idBlock Balcão)",         value: "/img/idblock-balcao-list.webp",           type: "image_url" },
    m6_desc:  { label: "Produto 6 — Descrição (idBlock Balcão)", value: "Terminal em formato de balcão ou pedestal, adequado a recepções e pontos de atendimento com registro de jornada.", type: "text" },
    m7_nome:  { label: "Produto 7 — Nome  (idBlock Balcão Facial iDFace)", value: "idBlock Balcão Facial idFace",      type: "text" },
    m7_img:   { label: "Produto 7 — Imagem (idBlock Balcão Facial)",  value: "/img/idblock-balcao-facial-idface-list.webp", type: "image_url" },
    m7_desc:  { label: "Produto 7 — Descrição (idBlock Balcão Facial)", value: "Terminal de balcão com identificação facial para filas organizadas e menor tempo de espera.", type: "text" },
    m8_nome:  { label: "Produto 8 — Nome  (idBlock Balcão Facial Max)", value: "idBlock Balcão Facial idFace Max",     type: "text" },
    m8_img:   { label: "Produto 8 — Imagem (idBlock Balcão Facial Max)", value: "/img/idblock-balcao-facial-idface-max-list.webp", type: "image_url" },
    m8_desc:  { label: "Produto 8 — Descrição (idBlock Balcão Facial Max)", value: "Versão com módulo facial de alto desempenho em layout de balcão, para ambientes corporativos com grande circulação.", type: "text" },
    m9_nome:  { label: "Produto 9 — Nome  (idBlock BQC)",             value: "idBlock BQC",                            type: "text" },
    m9_img:   { label: "Produto 9 — Imagem (idBlock BQC)",            value: "/img/idblock-bqc-list.webp",             type: "image_url" },
    m9_desc:  { label: "Produto 9 — Descrição (idBlock BQC)", value: "Módulo de controle BQC para integração em soluções de catraca e controle de acesso.", type: "text" },
    m10_nome: { label: "Produto 10 — Nome  (idBlock Facial)",         value: "idBlock Facial",                         type: "text" },
    m10_img:  { label: "Produto 10 — Imagem (idBlock Facial)",        value: "/img/idblock-facial-list.webp",          type: "image_url" },
    m10_desc: { label: "Produto 10 — Descrição (idBlock Facial)", value: "Catraca com acabamento moderno e leitura facial integrada ao controle de ponto e acesso.", type: "text" },
    m11_nome: { label: "Produto 11 — Nome  (idBlock Facial Mini)",    value: "idBlock Facial Mini",                    type: "text" },
    m11_img:  { label: "Produto 11 — Imagem (idBlock Facial Mini)",   value: "/img/idblock-facial-mini-list.webp",     type: "image_url" },
    m11_desc: { label: "Produto 11 — Descrição (idBlock Facial Mini)", value: "Modelo compacto com biometria facial para espaços físicos reduzidos, mantendo segurança no registro de presença.", type: "text" },
    m12_nome: { label: "Produto 12 — Nome  (idBlock Facial Mini Max)", value: "idBlock Facial Mini idFace Max",        type: "text" },
    m12_img:  { label: "Produto 12 — Imagem (idBlock Facial Mini Max)", value: "/img/idblock-facial-mini-idface-max-list.webp", type: "image_url" },
    m12_desc: { label: "Produto 12 — Descrição (idBlock Facial Mini Max)", value: "Terminal mini com tecnologia facial avançada para corredores e áreas reduzidas.", type: "text" },
    m13_nome: { label: "Produto 13 — Nome  (idBlock Inox)",           value: "idBlock Inox",                           type: "text" },
    m13_img:  { label: "Produto 13 — Imagem (idBlock Inox)",          value: "/img/idblock-inox-list.webp",            type: "image_url" },
    m13_desc: { label: "Produto 13 — Descrição (idBlock Inox)", value: "Acabamento em aço inoxidável, pensado para higiene e durabilidade em indústrias alimentícias ou ambientes úmidos.", type: "text" },
    m14_nome: { label: "Produto 14 — Nome  (idBlock Preta)",          value: "idBlock Preta",                          type: "text" },
    m14_img:  { label: "Produto 14 — Imagem (idBlock Preta)",         value: "/img/idblock-preta-list.webp",           type: "image_url" },
    m14_desc: { label: "Produto 14 — Descrição (idBlock Preta)", value: "Estética escura para composição discreta em fachadas e halls corporativos.", type: "text" },
    m15_nome: { label: "Produto 15 — Nome  (idBlock QR)",             value: "idBlock com leitura QR / credencial",    type: "text" },
    m15_img:  { label: "Produto 15 — Imagem (idBlock QR)",            value: "/img/idblock-qr-list.webp",              type: "image_url" },
    m15_desc: { label: "Produto 15 — Descrição (idBlock QR)", value: "Flexibiliza o registro por QR Code, cartão ou credencial conforme o projeto.", type: "text" },
    m16_nome: { label: "Produto 16 — Nome  (idBlock PCD)",            value: "idBlock PCD",                            type: "text" },
    m16_img:  { label: "Produto 16 — Imagem (idBlock PCD)",           value: "/img/idblock-pcd-list.webp",             type: "image_url" },
    m16_desc: { label: "Produto 16 — Descrição (idBlock PCD)", value: "Passagem dimensionada com foco em acessibilidade e conforto para circulação inclusiva.", type: "text" },
    m17_nome: { label: "Produto 17 — Nome  (idBlock PCD Facial)",     value: "idBlock PCD Facial",                     type: "text" },
    m17_img:  { label: "Produto 17 — Imagem (idBlock PCD Facial)",    value: "/img/idblock-pcd-facial-list.webp",      type: "image_url" },
    m17_desc: { label: "Produto 17 — Descrição (idBlock PCD Facial)", value: "Combina recursos de acessibilidade com identificação facial para registro de jornada inclusivo.", type: "text" },
    m18_nome: { label: "Produto 18 — Nome  (idBlock PCD Facial Max)", value: "idBlock PCD Facial idFace Max",          type: "text" },
    m18_img:  { label: "Produto 18 — Imagem (idBlock PCD Facial Max)", value: "/img/idblock-pcd-facial-idface-max-list.webp", type: "image_url" },
    m18_desc: { label: "Produto 18 — Descrição (idBlock PCD Facial Max)", value: "Configuração acessível com leitor facial de alto rendimento para filas mistas e alto volume.", type: "text" },
    m19_nome: { label: "Produto 19 — Nome  (idBlock Next)",           value: "idBlock Next",                           type: "text" },
    m19_img:  { label: "Produto 19 — Imagem (idBlock Next)",          value: "/img/idblock-next-list.webp",            type: "image_url" },
    m19_desc: { label: "Produto 19 — Descrição (idBlock Next)", value: "Nova geração da linha idBlock com design atualizado para controle de presença e acesso.", type: "text" },
    m20_nome: { label: "Produto 20 — Nome  (idBlock Next iDFace Max)", value: "idBlock Next idFace Max",              type: "text" },
    m20_img:  { label: "Produto 20 — Imagem (idBlock Next iDFace Max)", value: "/img/idblock-next-idface-max-list.webp", type: "image_url" },
    m20_desc: { label: "Produto 20 — Descrição (idBlock Next iDFace Max)", value: "Série Next com módulo facial premium para identificação rápida em ambientes corporativos.", type: "text" },
    m21_nome: { label: "Produto 21 — Nome  (idBlock Next BQC)",       value: "idBlock Next BQC",                       type: "text" },
    m21_img:  { label: "Produto 21 — Imagem (idBlock Next BQC)",      value: "/img/idblock-next-bqc-list.webp",        type: "image_url" },
    m21_desc: { label: "Produto 21 — Descrição (idBlock Next BQC)", value: "Integração da série Next com plataforma BQC para projetos de catraca sob medida.", type: "text" },
    m22_nome: { label: "Produto 22 — Nome  (idBlock Next BQC Max)",   value: "idBlock Next BQC idFace Max",            type: "text" },
    m22_img:  { label: "Produto 22 — Imagem (idBlock Next BQC Max)",  value: "/img/idblock-next-bqc-idface-max-list.webp", type: "image_url" },
    m22_desc: { label: "Produto 22 — Descrição (idBlock Next BQC Max)", value: "Combinação Next, BQC e leitor facial de alto desempenho para segurança perimetral e registro de jornada.", type: "text" },
    m23_nome: { label: "Produto 23 — Nome  (idBlock Next Contador)",  value: "idBlock Next com contador de giros",     type: "text" },
    m23_img:  { label: "Produto 23 — Imagem (idBlock Next Contador)", value: "/img/idblock-next-contador-giros-list.webp", type: "image_url" },
    m23_desc: { label: "Produto 23 — Descrição (idBlock Next Contador)", value: "Monitoramento e contagem de passagens para operação e auditoria.", type: "text" },
  }, 23),

  // ── CATÁLOGO — COMPUTADORES E HARDWARE ───────────────────────────────────
  catalogo_computadores: withCatalogModelExtras({
    video_url: { label: "Vídeo Tutorial — URL do YouTube", value: "", type: "link" },
    m1_nome: { label: "Hardware 1 — Nome  (Nobreak SMS)",   value: "Nobreak SMS 1200VA",             type: "text" },
    m1_img:  { label: "Hardware 1 — Imagem (Nobreak SMS)",  value: "/img/NOBREAK SMS 1200va.webp",   type: "image_url" },
    m1_desc: { label: "Hardware 1 — Descrição (Nobreak SMS)", value: "Proteção de energia para sistemas críticos. Autonomia de até 30 minutos e estabilização de voltagem. Ideal para PDV e equipamentos eletrônicos.", type: "text" },
    m2_nome: { label: "Hardware 2 — Nome  (Gaveta Dinheiro)", value: "Gaveta de Dinheiro",           type: "text" },
    m2_img:  { label: "Hardware 2 — Imagem (Gaveta Dinheiro)", value: "/img/GAVETA DE DINHEIRO.jpg", type: "image_url" },
    m2_desc: { label: "Hardware 2 — Descrição (Gaveta Dinheiro)", value: "Gaveta de dinheiro para PDV com abertura via comando do sistema. Estrutura robusta e compatível com principais softwares de vendas.", type: "text" },
    m3_nome: { label: "Hardware 3 — Nome  (Impressora térmica)", value: "Impressora térmica profissional", type: "text" },
    m3_img:  { label: "Hardware 3 — Imagem (Impressora térmica)", value: "/img/impressora.webp",    type: "image_url" },
    m3_desc: { label: "Hardware 3 — Descrição (Impressora térmica)", value: "Periférico para impressão de comprovantes, recibos e documentos em ambientes comerciais, com foco em confiabilidade no dia a dia do PDV.", type: "text" },
  }, 3),

  // ── CATÁLOGO — EMBALADORAS ────────────────────────────────────────────────
  catalogo_embaladoras: withCatalogModelExtras({
    video_url: { label: "Vídeo Tutorial — URL do YouTube", value: "", type: "link" },
    m1_nome: { label: "Embaladora 1 — Nome",    value: "Embaladoras e Seladoras",   type: "text" },
    m1_img:  { label: "Embaladora 1 — Imagem",  value: "/img/embaladoras.webp",     type: "image_url" },
    m1_desc: { label: "Embaladora 1 — Descrição", value: "Linha completa de embaladoras, seladoras e máquinas de embalar. Equipamentos para proteção e apresentação de produtos com eficiência.", type: "text" },
  }, 1),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export type ContentValues = Record<string, Record<string, string>>;

/** Extrai apenas os valores (sem metadados), agrupados por seção. */
export function getDefaultValues(): ContentValues {
  const result: ContentValues = {};
  for (const [section, fields] of Object.entries(defaultContent)) {
    result[section] = {};
    for (const [key, field] of Object.entries(fields)) {
      result[section][key] = field.value;
    }
  }
  return result;
}

/** Converte itens separados por \n em array de strings (para campos de lista). */
export function parseListField(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
