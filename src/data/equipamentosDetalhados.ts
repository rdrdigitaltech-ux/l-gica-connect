export interface ModeloEquipamento {
  id: string;
  nome: string;
  imagem: string;
  descricao: string;
  categoria:
    | "balancas"
    | "leitores"
    | "relogio-ponto"
    | "computadores-hardware"
    | "impressoras"
    | "embaladoras";
  subcategoria?: string;
  video_url?: string;
}

// Tipos de subcategorias (usados nos filtros das páginas)
export type SubcategoriaBalanca =
  | "Etiquetadoras"
  | "Bancada"
  | "Plataforma"
  | "Checkout"
  | "Precisão";

export type SubcategoriaLeitor =
  | "Leitor Manual"
  | "Leitor Sem Fio"
  | "Leitor Fixo"
  | "Leitor com Pedestal";

export type SubcategoriaRelogioPonto =
  | "Relógio de Ponto com Facial"
  | "Relógio de Ponto sem Facial"
  | "Catraca com Facial"
  | "Catraca sem Facial";

export const modelosEquipamentos: ModeloEquipamento[] = [
  // ═══════════════════════════════════════
  // BALANÇAS
  // ═══════════════════════════════════════
  {
    id: "balanca-toledo-prix-3-fit",
    nome: "Balança Toledo Prix 3 Fit",
    imagem: "/img/Prix 3 Fit.webp",
    descricao:
      "Balança eletrônica compacta com impressora integrada, ideal para açougues, feiras e supermercados. Display amplo e fácil leitura.",
    categoria: "balancas",
    subcategoria: "Etiquetadoras",
  },
  {
    id: "balanca-toledo-prix-4-uno",
    nome: "Balança Toledo Prix 4 Uno",
    imagem: "/img/Prix 4 Uno (4).webp",
    descricao:
      "Modelo avançado com conectividade USB e impressão térmica de alta velocidade. Perfeita para ambientes de alto fluxo e pesagem precisa.",
    categoria: "balancas",
    subcategoria: "Etiquetadoras",
  },
  {
    id: "balanca-urano-us-31",
    nome: "Balança Urano US 31",
    imagem: "/img/Urano US 31 2.webp",
    descricao:
      "Balança de plataforma robusta para pesagem comercial. Estrutura reforçada, alta precisão e display de fácil leitura.",
    categoria: "balancas",
    subcategoria: "Plataforma",
  },

  // ═══════════════════════════════════════
  // LEITORES DE CÓDIGO DE BARRAS
  // ═══════════════════════════════════════
  {
    id: "leitor-elgin-qw-2120",
    nome: "Leitor Elgin QW 2120",
    imagem: "/img/Elgin QW 2120.webp",
    descricao:
      "Scanner compacto e ergonômico com leitura omnidirecional. Conexão USB plug-and-play. Alta velocidade de captura para agilizar vendas.",
    categoria: "leitores",
    subcategoria: "Leitor Manual",
  },
  {
    id: "leitor-tectoy-2d-fd-120",
    nome: "Leitor Tectoy 2D FD-120",
    imagem: "/img/Tectoy 2D FD-120.webp",
    descricao:
      "Leitor 2D fixo para PDV com excelente custo-benefício. Leitura de códigos de barras e QR Code. Ideal para checkout.",
    categoria: "leitores",
    subcategoria: "Leitor Fixo",
  },
  {
    id: "leitor-bematech-br400i",
    nome: "Bematech BR400i",
    imagem: "/img/Bematech BR400i.webp",
    descricao:
      "Este leitor é amplamente utilizado em supermercados, lojas de roupas e farmácias para registrar rapidamente as informações de produtos, agilizando o atendimento ao cliente e garantindo a precisão no controle de estoque.",
    categoria: "leitores",
    subcategoria: "Leitor Manual",
  },
  {
    id: "leitor-bematech-ccd-br420",
    nome: "Bematech CCD BR-420",
    imagem: "/img/Bematech CCD BR-420.webp",
    descricao:
      "É um modelo de entrada rápido, com 100 leituras por segundo, ideal para ler códigos de produtos, DANFEs (notas fiscais) e boletos, com alta resistência a quedas (até 1,5m).",
    categoria: "leitores",
    subcategoria: "Leitor Manual",
  },
  {
    id: "leitor-elgin-el-250",
    nome: "Elgin EL-250",
    imagem: "/img/Elgin EL-250.webp",
    descricao:
      "Equipamento Elgin para automação comercial. Compacto e versátil para integração com sistemas de PDV.",
    categoria: "leitores",
    subcategoria: "Leitor Manual",
  },

  // ═══════════════════════════════════════
  // RELÓGIOS DE PONTO
  // ═══════════════════════════════════════
  {
    id: "relogio-control-id",
    nome: "Relógio de Ponto Control iD",
    imagem: "/img/RELOGIO PONTO CONTROL ID.webp",
    descricao:
      "Terminal de ponto com reconhecimento biométrico e tela colorida. Registro seguro de jornada e controle de acesso. Conectividade via rede.",
    categoria: "relogio-ponto",
    subcategoria: "Relógio de Ponto sem Facial",
  },
  {
    id: "terminal-idface-frontal",
    nome: "Relógio de Ponto iDFace",
    imagem: "/img/idface-frontal.webp",
    descricao:
      "Terminal com reconhecimento facial e interface em tela sensível ao toque, pensado para registro rápido de jornada e reforço da segurança no controle de acesso. Descrição meramente ilustrativa de equipamento comercializado pela Lógica; recursos e integrações devem ser alinhados na proposta.",
    categoria: "relogio-ponto",
    subcategoria: "Relógio de Ponto com Facial",
  },
  {
    id: "torniquete-list",
    nome: "Torniquete de controle de acesso",
    imagem: "/img/torniquete-list.webp",
    descricao:
      "Catraca para fluxo de entrada e saída, indicada para registro de presença e controle de circulação em empresas e condomínios. Texto ilustrativo do portfólio de ponto e acesso da Lógica.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },
  {
    id: "torniquete-facial-list",
    nome: "Torniquete com reconhecimento facial",
    imagem: "/img/torniquete-facial-list.webp",
    descricao:
      "Solução de catraca com módulo biométrico facial para liberação sem contato, alinhada a políticas de segurança e registro de jornada. Descrição de exemplo para consulta comercial.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "torniquete-facial-idface-max-list",
    nome: "Torniquete facial idFace Max",
    imagem: "/img/torniquete-facial-idface-max-list.webp",
    descricao:
      "Configuração voltada a alto fluxo, com leitor facial de desempenho elevado. Equipamento de ponto e acesso comercializado pela Lógica; detalhes técnicos sob consulta.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-balcao-list",
    nome: "idBlock Balcão",
    imagem: "/img/idblock-balcao-list.webp",
    descricao:
      "Terminal em formato de balcão ou pedestal, adequado a recepções e pontos de atendimento com registro de jornada. Conteúdo ilustrativo do catálogo.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },
  {
    id: "idblock-balcao-facial-idface-list",
    nome: "idBlock Balcão Facial idFace",
    imagem: "/img/idblock-balcao-facial-idface-list.webp",
    descricao:
      "Terminal de balcão com identificação facial para filas organizadas e menor tempo de espera. Texto ilustrativo para apresentação do portfólio.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-balcao-facial-idface-max-list",
    nome: "idBlock Balcão Facial idFace Max",
    imagem: "/img/idblock-balcao-facial-idface-max-list.webp",
    descricao:
      "Versão com módulo facial de alto desempenho em layout de balcão, para ambientes corporativos com grande circulação. Descrição genérica de vitrine.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-bqc-list",
    nome: "idBlock BQC",
    imagem: "/img/idblock-bqc-list.webp",
    descricao:
      "Módulo de controle BQC para integração em soluções de catraca e controle de acesso. Informação ilustrativa da linha idBlock.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },
  {
    id: "idblock-facial-list",
    nome: "idBlock Facial",
    imagem: "/img/idblock-facial-list.webp",
    descricao:
      "Catraca com acabamento moderno e leitura facial integrada ao controle de ponto e acesso. Texto de apoio ao catálogo Lógica.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-facial-mini-list",
    nome: "idBlock Facial Mini",
    imagem: "/img/idblock-facial-mini-list.webp",
    descricao:
      "Modelo compacto com biometria facial para espaços físicos reduzidos, mantendo segurança no registro de presença. Conteúdo ilustrativo.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-facial-mini-idface-max-list",
    nome: "idBlock Facial Mini idFace Max",
    imagem: "/img/idblock-facial-mini-idface-max-list.webp",
    descricao:
      "Terminal mini com tecnologia facial avançada para corredores e áreas reduzidas. Exemplo de descrição para divulgação comercial.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-inox-list",
    nome: "idBlock Inox",
    imagem: "/img/idblock-inox-list.webp",
    descricao:
      "Acabamento em aço inoxidável, pensado para higiene e durabilidade em indústrias alimentícias ou ambientes úmidos. Texto ilustrativo.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },
  {
    id: "idblock-preta-list",
    nome: "idBlock Preta",
    imagem: "/img/idblock-preta-list.webp",
    descricao:
      "Estética escura para composição discreta em fachadas e halls corporativos. Descrição ilustrativa de controle de ponto e acesso.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },
  {
    id: "idblock-qr-list",
    nome: "idBlock com leitura QR / credencial",
    imagem: "/img/idblock-qr-list.webp",
    descricao:
      "Flexibiliza o registro por QR Code, cartão ou credencial conforme o projeto. Exemplo de texto para linha de ponto e acesso da Lógica.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },
  {
    id: "idblock-pcd-list",
    nome: "idBlock PCD",
    imagem: "/img/idblock-pcd-list.webp",
    descricao:
      "Passagem dimensionada com foco em acessibilidade e conforto para circulação inclusiva. Conteúdo meramente ilustrativo.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },
  {
    id: "idblock-pcd-facial-list",
    nome: "idBlock PCD Facial",
    imagem: "/img/idblock-pcd-facial-list.webp",
    descricao:
      "Combina recursos de acessibilidade com identificação facial para registro de jornada inclusivo. Descrição ilustrativa do catálogo.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-pcd-facial-idface-max-list",
    nome: "idBlock PCD Facial idFace Max",
    imagem: "/img/idblock-pcd-facial-idface-max-list.webp",
    descricao:
      "Configuração acessível com leitor facial de alto rendimento para filas mistas e alto volume. Texto de vitrine, sem caráter contratual.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-next-list",
    nome: "idBlock Next",
    imagem: "/img/idblock-next-list.webp",
    descricao:
      "Nova geração da linha idBlock com design atualizado para controle de presença e acesso. Informação ilustrativa para o site.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-next-idface-max-list",
    nome: "idBlock Next idFace Max",
    imagem: "/img/idblock-next-idface-max-list.webp",
    descricao:
      "Série Next com módulo facial premium para identificação rápida em ambientes corporativos. Descrição exemplificativa; condições com o consultor.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-next-bqc-list",
    nome: "idBlock Next BQC",
    imagem: "/img/idblock-next-bqc-list.webp",
    descricao:
      "Integração da série Next com plataforma BQC para projetos de catraca sob medida. Texto ilustrativo do portfólio.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-next-bqc-idface-max-list",
    nome: "idBlock Next BQC idFace Max",
    imagem: "/img/idblock-next-bqc-idface-max-list.webp",
    descricao:
      "Combinação Next, BQC e leitor facial de alto desempenho para segurança perimetral e registro de jornada. Conteúdo ilustrativo.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca com Facial",
  },
  {
    id: "idblock-next-contador-giros-list",
    nome: "idBlock Next com contador de giros",
    imagem: "/img/idblock-next-contador-giros-list.webp",
    descricao:
      "Monitoramento e contagem de passagens para operação e auditoria. Equipamento de ponto e acesso comercializado pela Lógica; descrição genérica.",
    categoria: "relogio-ponto",
    subcategoria: "Catraca sem Facial",
  },

  // ═══════════════════════════════════════
  // COMPUTADORES E HARDWARE
  // ═══════════════════════════════════════
  {
    id: "nobreak-sms-1200va",
    nome: "Nobreak SMS 1200VA",
    imagem: "/img/NOBREAK SMS 1200va.webp",
    descricao:
      "Proteção de energia para sistemas críticos. Autonomia de até 30 minutos e estabilização de voltagem. Ideal para PDV e equipamentos eletrônicos.",
    categoria: "computadores-hardware",
  },
  {
    id: "gaveta-dinheiro",
    nome: "Gaveta de Dinheiro",
    imagem: "/img/GAVETA DE DINHEIRO.jpg",
    descricao:
      "Gaveta de dinheiro para PDV com abertura via comando do sistema. Estrutura robusta e compatível com principais softwares de vendas.",
    categoria: "computadores-hardware",
  },
  {
    id: "impressora-comercial-perifericos",
    nome: "Impressora térmica profissional",
    imagem: "/img/impressora.webp",
    descricao:
      "Periférico para impressão de comprovantes, recibos e documentos em ambientes comerciais, com foco em confiabilidade no dia a dia do PDV. Descrição meramente ilustrativa de equipamento comercializado pela Lógica; modelo e especificações conforme disponibilidade e projeto.",
    categoria: "computadores-hardware",
  },

  // ═══════════════════════════════════════
  // IMPRESSORAS
  // ═══════════════════════════════════════
  {
    id: "impressora-elgin-l42-pro",
    nome: "Elgin L-42 PRO",
    imagem: "/img/Elgin L-42 PRO.webp",
    descricao:
      "Computador PDV all-in-one com tela touch, processador Intel e sistema operacional Windows. Solução completa para varejo e automação comercial.",
    categoria: "impressoras",
  },
  {
    id: "impressora-argox-os-214-plus",
    nome: "Argox OS 214 Plus",
    imagem: "/img/Argox OS 214 Plus.webp",
    descricao:
      "Leitor 2D de alta performance com leitura omnidirecional. Lê códigos de barras e QR Code em superfícies diversas. Ideal para varejo.",
    categoria: "impressoras",
  },
  {
    id: "impressora-elgin-i8",
    nome: "Impressora Elgin i8",
    imagem: "/img/Elgin i8 (2).webp",
    descricao:
      "Impressora fiscal térmica homologada pela SEFAZ. Impressão rápida de cupons fiscais e notas. Solução econômica para pequenos varejistas.",
    categoria: "impressoras",
  },
  {
    id: "impressora-elgin-i9",
    nome: "Impressora Elgin i9",
    imagem: "/img/Elgin i9.webp",
    descricao:
      "Impressora fiscal térmica homologada pela SEFAZ. Impressão rápida e silenciosa de cupons e notas. Alta durabilidade.",
    categoria: "impressoras",
  },
  {
    id: "impressora-bematech-mp-4200",
    nome: "Impressora Bematech MP 4200",
    imagem: "/img/Bematech MP 4200.webp",
    descricao:
      "Impressora fiscal de mesa com ampla compatibilidade. Ideal para supermercados, farmácias e comércio em geral.",
    categoria: "impressoras",
  },
  {
    id: "impressora-epson-tm-t20x",
    nome: "Impressora Epson TM-T20X",
    imagem: "/img/Epson TM- T20X.webp",
    descricao:
      "Impressora não-fiscal térmica de alta velocidade. Ideal para impressão de recibos e comandos. Silenciosa e confiável.",
    categoria: "impressoras",
  },
  {
    id: "impressora-zebra-zt231",
    nome: "Zebra ZT231",
    imagem: "/img/ZT231 – Impressora industrial padrão de 4 polegadas.webp",
    descricao:
      "Impressora industrial de mesa, padrão de 4 polegadas, indicada para etiquetas em produção, expedição e automação com demanda contínua. Descrição ilustrativa de produto comercializado pela Lógica; mídias, conectividade e opcionais conforme orçamento.",
    categoria: "impressoras",
  },
  {
    id: "impressora-zebra-zt411",
    nome: "Zebra ZT411",
    imagem: "/img/ZT411.webp",
    descricao:
      "Impressora industrial para etiquetas e codificação em ambientes de produção, logística e varejo com maior demanda de volume. Texto ilustrativo de equipamento comercializado pela Lógica; configurações e homologações dependem do projeto.",
    categoria: "impressoras",
  },
  {
    id: "impressora-zebra-zt411-linerless",
    nome: "Zebra ZT411 Linerless",
    imagem: "/img/ZT411 Linerless.webp",
    descricao:
      "Versão voltada a mídia linerless, reduzindo resíduos de papel cristal e agilizando troca de rolo em linhas contínuas. Descrição meramente ilustrativa para apresentação do portfólio.",
    categoria: "impressoras",
  },
  {
    id: "impressora-zebra-zt411-rfid",
    nome: "Zebra ZT411 RFID",
    imagem: "/img/ZT411 RFID.webp",
    descricao:
      "Solução com gravação e impressão RFID, pensada para rastreabilidade, inventário e cadeias que exigem identificação por radiofrequência. Conteúdo ilustrativo; especificações com o consultor.",
    categoria: "impressoras",
  },
  {
    id: "impressora-zebra-zt421",
    nome: "Zebra ZT421",
    imagem: "/img/ZT421.webp",
    descricao:
      "Modelo industrial com foco em largura útil ampliada para etiquetas maiores, sinalização e aplicações de expedição. Informação genérica para divulgação comercial da Lógica.",
    categoria: "impressoras",
  },
  {
    id: "impressora-zebra-zt421-rfid",
    nome: "Zebra ZT421 RFID",
    imagem: "/img/ZT421 RFID.webp",
    descricao:
      "Combina impressão de grande formato com codificação RFID para operações que integram identificação visual e eletrônica. Descrição exemplificativa, sem caráter contratual.",
    categoria: "impressoras",
  },
  // ═══════════════════════════════════════
  // EMBALADORAS
  // ═══════════════════════════════════════
  {
    id: "embaladora-generica",
    nome: "Embaladoras e Seladoras",
    imagem: "/img/embaladoras.webp",
    descricao:
      "Linha completa de embaladoras, seladoras e máquinas de embalar. Equipamentos para proteção e apresentação de produtos com eficiência.",
    categoria: "embaladoras",
  },
];

// Função auxiliar para filtrar por categoria
export const getModelosPorCategoria = (
  categoria: ModeloEquipamento["categoria"]
) => {
  return modelosEquipamentos.filter((m) => m.categoria === categoria);
};

// Função para gerar descrição automática baseada no nome (USAR COMO FALLBACK)
export const gerarDescricao = (nome: string, tipo: string): string => {
  const descricoes: Record<string, string[]> = {
    balancas: [
      "Balança eletrônica de alta precisão para pesagem comercial.",
      "Equipamento robusto com display de fácil leitura e impressão de etiquetas.",
      "Solução completa para controle de peso em estabelecimentos comerciais.",
    ],
    leitores: [
      "Leitor de código de barras rápido e confiável para agilizar vendas.",
      "Scanner de alta performance com leitura omnidirecional.",
      "Dispositivo ergonômico para captura eficiente de códigos.",
    ],
    "relogio-ponto": [
      "Controle de ponto eletrônico com registro seguro de jornada.",
      "Terminal biométrico para gestão de acesso e presença.",
      "Solução completa para controle de horários e frequência.",
    ],
    "computadores-hardware": [
      "Equipamento de alta performance para automação comercial.",
      "Hardware robusto e confiável para uso profissional.",
      "Solução tecnológica para otimizar operações do negócio.",
    ],
    impressoras: [
      "Impressora fiscal homologada para emissão de documentos.",
      "Equipamento de impressão rápida e eficiente para PDV.",
      "Solução completa para impressão de cupons e notas fiscais.",
    ],
    embaladoras: [
      "Equipamento para embalar produtos com eficiência e segurança.",
      "Seladora automática para otimizar processo de embalagem.",
      "Solução profissional para proteção e apresentação de produtos.",
    ],
  };

  const opcoes =
    descricoes[tipo] || [
      "Equipamento profissional para automação comercial.",
    ];
  return opcoes[Math.floor(Math.random() * opcoes.length)];
};
