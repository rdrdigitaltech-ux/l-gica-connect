import { PrismaClient, ContentType } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

// Simple bcrypt-like hash for seed (replace with real bcrypt in production)
// For production, the admin should reset the password via the panel
function hashPassword(password: string): string {
  return createHash("sha256").update(password + process.env.JWT_SECRET).digest("hex");
}

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // ─── Admin User ───────────────────────────────────────────────────
  await prisma.user.upsert({
    where: { email: "admin@logica.inf.br" },
    update: {},
    create: {
      email: "admin@logica.inf.br",
      passwordHash: hashPassword("admin123"),
    },
  });
  console.log("✅ Usuário admin criado: admin@logica.inf.br / admin123");

  // ─── Conteúdo do Site ─────────────────────────────────────────────
  const contents: {
    section: string;
    key: string;
    label: string;
    value: string;
    type: ContentType;
  }[] = [
    // HERO
    {
      section: "hero",
      key: "titulo",
      label: "Título Principal",
      value: "Automação Comercial e Informática para Brusque, Blumenau e região",
      type: "text",
    },
    {
      section: "hero",
      key: "subtitulo",
      label: "Subtítulo",
      value: "Transforme seu negócio com soluções eficientes e tecnologia avançada.",
      type: "text",
    },
    {
      section: "hero",
      key: "badge_anos",
      label: "Badge — Anos de mercado",
      value: "36 anos",
      type: "text",
    },
    {
      section: "hero",
      key: "badge_clientes",
      label: "Badge — Clientes atendidos",
      value: "52 mil+",
      type: "text",
    },
    {
      section: "hero",
      key: "banner_desktop",
      label: "Banner Desktop",
      value: "/img/novobanner-desktop.webp",
      type: "image_url",
    },
    {
      section: "hero",
      key: "banner_tablet",
      label: "Banner Tablet",
      value: "/img/novobanner-tablet.webp",
      type: "image_url",
    },
    {
      section: "hero",
      key: "banner_mobile",
      label: "Banner Mobile",
      value: "/img/novobanner-mobile.webp",
      type: "image_url",
    },

    // SOBRE
    {
      section: "sobre",
      key: "titulo",
      label: "Título da Seção",
      value: "Mais de 3 Décadas Transformando Negócios em Santa Catarina",
      type: "text",
    },
    {
      section: "sobre",
      key: "descricao",
      label: "Descrição",
      value:
        "Conectando negócios com tecnologia desde 1988. Somos referência em automação comercial em Santa Catarina.",
      type: "text",
    },
    {
      section: "sobre",
      key: "missao",
      label: "Missão",
      value:
        "Fornecer soluções tecnológicas que simplifiquem a gestão comercial, aumentem a produtividade e impulsionem o crescimento dos nossos clientes através de inovação constante e suporte excepcional.",
      type: "text",
    },

    // NÚMEROS DE IMPACTO
    {
      section: "numeros",
      key: "anos",
      label: "Anos de mercado",
      value: "36",
      type: "text",
    },
    {
      section: "numeros",
      key: "clientes_ativos",
      label: "Clientes ativos",
      value: "1250",
      type: "text",
    },
    {
      section: "numeros",
      key: "estados",
      label: "Estados atendidos",
      value: "3",
      type: "text",
    },
    {
      section: "numeros",
      key: "empresas",
      label: "Empresas atendidas",
      value: "52200",
      type: "text",
    },

    // CONTATO
    {
      section: "contato",
      key: "email",
      label: "E-mail de atendimento",
      value: "atendimento@logica.inf.br",
      type: "text",
    },
    {
      section: "contato",
      key: "whatsapp",
      label: "Número WhatsApp (só dígitos)",
      value: "5547984218275",
      type: "text",
    },
    {
      section: "contato",
      key: "whatsapp_mensagem",
      label: "Mensagem padrão WhatsApp",
      value: "Olá, gostaria de falar com a Lógica Automação Comercial!",
      type: "text",
    },
    {
      section: "contato",
      key: "telefone_brusque",
      label: "Telefone Brusque",
      value: "(47) 3351-5497",
      type: "text",
    },
    {
      section: "contato",
      key: "telefone_blumenau",
      label: "Telefone Blumenau",
      value: "(47) 3328-0077",
      type: "text",
    },
    {
      section: "contato",
      key: "endereco_brusque",
      label: "Endereço Brusque",
      value: "Av. Dom Joaquim, 437 - Jardim Maluche",
      type: "text",
    },
    {
      section: "contato",
      key: "endereco_blumenau",
      label: "Endereço Blumenau",
      value: "R. Dois de Setembro, 4115 - Itoupava Norte",
      type: "text",
    },
    {
      section: "contato",
      key: "horario",
      label: "Horário de atendimento",
      value: "Segunda a Sexta, 08h às 18h",
      type: "text",
    },
    {
      section: "contato",
      key: "maps_brusque",
      label: "Link Google Maps — Brusque",
      value: "https://www.google.com/maps/dir/?api=1&destination=-27.10681,-48.92285",
      type: "link",
    },
    {
      section: "contato",
      key: "maps_blumenau",
      label: "Link Google Maps — Blumenau",
      value: "https://www.google.com/maps/dir/?api=1&destination=-26.9234,-49.0662",
      type: "link",
    },
    {
      section: "contato",
      key: "formspree_id",
      label: "ID do Formspree (formulário de contato)",
      value: "xzdjwzpe",
      type: "text",
    },

    // RODAPÉ
    {
      section: "rodape",
      key: "descricao",
      label: "Descrição do rodapé",
      value:
        "Conectando negócios com tecnologia desde 1988. Sua parceira em automação comercial e informática.",
      type: "text",
    },
    {
      section: "rodape",
      key: "horario",
      label: "Horário no rodapé",
      value: "Seg-Sex: 08h às 18h",
      type: "text",
    },
    {
      section: "rodape",
      key: "copyright",
      label: "Texto de copyright",
      value: "© 2026 Lógica Informática e Automação Comercial. Todos os direitos reservados.",
      type: "text",
    },

    // GERAL
    {
      section: "geral",
      key: "nome_empresa",
      label: "Nome da empresa",
      value: "Lógica Informática e Automação Comercial",
      type: "text",
    },
    {
      section: "geral",
      key: "slogan",
      label: "Slogan",
      value: "Conectando negócios com tecnologia",
      type: "text",
    },
    {
      section: "geral",
      key: "logo",
      label: "Logo (header)",
      value: "/img/logo.webp",
      type: "image_url",
    },
    {
      section: "geral",
      key: "logo_rodape",
      label: "Logo (rodapé)",
      value: "/img/logorodape.webp",
      type: "image_url",
    },
    {
      section: "geral",
      key: "cor_primaria",
      label: "Cor primária (vermelho)",
      value: "#FF4757",
      type: "color",
    },
    {
      section: "geral",
      key: "cor_secundaria",
      label: "Cor secundária",
      value: "#E63946",
      type: "color",
    },
    {
      section: "geral",
      key: "cor_fundo",
      label: "Cor de fundo",
      value: "#06080A",
      type: "color",
    },
  ];

  for (const item of contents) {
    await prisma.siteContent.upsert({
      where: { section_key: { section: item.section, key: item.key } },
      update: { label: item.label, value: item.value, type: item.type },
      create: item,
    });
  }
  console.log(`✅ ${contents.length} campos de conteúdo inseridos`);

  // ─── Configurações do Site ────────────────────────────────────────
  const settings: { key: string; label: string; value: string }[] = [
    { key: "nome_site", label: "Nome do site", value: "Lógica Automação Comercial" },
    { key: "logo", label: "Logo principal", value: "/img/logo.webp" },
    { key: "favicon", label: "Favicon", value: "/favicon.ico" },
    { key: "cor_primaria", label: "Cor primária", value: "#FF4757" },
    { key: "cor_secundaria", label: "Cor secundária", value: "#E63946" },
    { key: "cor_fundo", label: "Cor de fundo", value: "#06080A" },
    { key: "whatsapp", label: "WhatsApp (só dígitos)", value: "5547984218275" },
  ];

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: { label: s.label, value: s.value },
      create: s,
    });
  }
  console.log(`✅ ${settings.length} configurações inseridas`);

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log("   Admin: admin@logica.inf.br / admin123");
  console.log("   ⚠️  Troque a senha após o primeiro login!\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
