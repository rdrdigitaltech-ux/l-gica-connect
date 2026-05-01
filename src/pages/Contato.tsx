import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronRight,
  Navigation,
} from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const units = [
  {
    city: "Brusque",
    address: "Av. Dom Joaquim, 437 - Jardim Maluche",
    phone: "(47) 3351-5497",
    email: "atendimento@logica.inf.br",
    mapsDirUrl:
      "https://www.google.com/maps/dir/?api=1&destination=-27.10681,-48.92285",
  },
  {
    city: "Blumenau",
    address: "R. Dois de Setembro, 4115 - Itoupava Norte",
    phone: "(47) 3328-0077",
    email: "atendimento@logica.inf.br",
    mapsDirUrl:
      "https://www.google.com/maps/dir/?api=1&destination=-26.9234,-49.0662",
  },
];

const inputBaseStyle = {
  borderColor: "rgba(230, 57, 70, 0.2)",
  background: "rgba(15, 17, 21, 0.5)",
  color: "#E5E7EB",
};

export default function Contato() {
  const { content: ct } = useSiteContent("contato");

  const units = [
    {
      city: "Brusque",
      address: ct.endereco_brusque ?? "Av. Dom Joaquim, 437 - Jardim Maluche",
      phone: ct.telefone_brusque ?? "(47) 3351-5497",
      email: ct.email ?? "atendimento@logica.inf.br",
      mapsDirUrl: ct.maps_brusque ?? "https://www.google.com/maps/dir/?api=1&destination=-27.10681,-48.92285",
    },
    {
      city: "Blumenau",
      address: ct.endereco_blumenau ?? "R. Dois de Setembro, 4115 - Itoupava Norte",
      phone: ct.telefone_blumenau ?? "(47) 3328-0077",
      email: ct.email ?? "atendimento@logica.inf.br",
      mapsDirUrl: ct.maps_blumenau ?? "https://www.google.com/maps/dir/?api=1&destination=-26.9234,-49.0662",
    },
  ];

  const formspreeId = ct.formspree_id ?? "xzdjwzpe";
  const redirectUrl = ct.redirect_obrigado ?? "https://l-gica-connect.vercel.app/obrigado";

  return (
    <div className="min-h-screen" style={{ background: "#06080A" }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-16"
        style={{
          background:
            "linear-gradient(180deg, #06080A 0%, #0A0C10 50%, #12141A 100%)",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="text-gray-400 transition-colors hover:text-[#FF4757]">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Contato</span>
          </nav>
          <h1 className="mb-6 text-4xl font-extrabold text-gray-200 lg:text-5xl">
            {ct.hero_titulo ?? "Entre em Contato"}
          </h1>
          <p className="max-w-3xl text-base text-gray-400 lg:text-lg">
            {ct.hero_subtitulo ?? "Estamos prontos para atender você. Fale conosco e descubra como podemos transformar seu negócio"}
            Entre em Contato
          </h1>
          <p className="max-w-3xl text-base text-gray-400 lg:text-lg">
            Estamos prontos para atender você. Fale conosco e descubra como
            podemos transformar seu negócio
          </p>
        </div>
      </section>

      {/* Formulário + Informações */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          background:
            "linear-gradient(180deg, #12141A 0%, #0A0C10 70%, #06080A 100%)",
        }}
      >
        {/* Overlay de transição do hero */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
          style={{
            background: "linear-gradient(180deg, #0A0C10 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
          style={{
            width: 550,
            height: 550,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-[12%] -right-[10%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 50%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />
        {/* Overlay inferior para transição ao footer */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-24"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #06080A 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Coluna 1 - Formulário */}
            <div
              className="relative rounded-2xl border p-6 md:p-8"
              style={{
                background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                borderColor: "rgba(255, 71, 87, 0.25)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px rounded-t-2xl opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.6), transparent)",
                  boxShadow: "0 0 8px rgba(230, 57, 70, 0.5)",
                }}
              />
              <h2 className="mb-6 text-2xl font-bold text-gray-200">
                {ct.form_titulo ?? "Envie sua Mensagem"}
              </h2>
              <form
                action={`https://formspree.io/f/${formspreeId}`}
                Envie sua Mensagem
              </h2>
              <form
                action="https://formspree.io/f/xzdjwzpe"
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Nome *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4757]/50"
                    style={inputBaseStyle}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4757]/50"
                    style={inputBaseStyle}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    name="phone"
                    type="text"
                    required
                    placeholder="(47) 99999-9999"
                    className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4757]/50"
                    style={inputBaseStyle}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Empresa
                    </label>
                    <input
                      name="company"
                      type="text"
                      placeholder="Nome da empresa"
                      className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4757]/50"
                      style={inputBaseStyle}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Cidade
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="Sua cidade"
                      className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4757]/50"
                      style={inputBaseStyle}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Assunto *
                  </label>
                  <select
                    name="subject"
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4757]/50"
                    style={inputBaseStyle}
                    defaultValue=""
                  >
                    <option value="">Selecione...</option>
                    <option value="orcamento">Orçamento</option>
                    <option value="suporte">Suporte</option>
                    <option value="duvidas">Dúvidas</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Descreva como podemos ajudar..."
                    className="w-full resize-none rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4757]/50"
                    style={inputBaseStyle}
                  />
                </div>

                {/* Anti-spam (honeypot) */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input type="hidden" name="_next" value={redirectUrl} />

                {/* Redirecionamento após envio */}
                <input
                  type="hidden"
                  name="_next"
                  value="https://l-gica-connect.vercel.app/obrigado"
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF4757] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E63946]"
                >
                  Enviar Mensagem
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Coluna 2 - Informações */}
            <div className="space-y-8">
              {units.map((unit) => (
                <div
                  key={unit.city}
                  className="rounded-2xl border p-6"
                  style={{
                    background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                    borderColor: "rgba(255, 71, 87, 0.25)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    className="pointer-events-none mb-4 h-px w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #FF4757, transparent)",
                    }}
                  />
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-200">
                    <MapPin className="h-5 w-5 text-[#FF4757]" />
                    {unit.city}
                  </h3>
                  <div className="space-y-3 text-sm text-gray-400">
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4757]" />
                      {unit.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-[#FF4757]" />
                      <a
                        href={`tel:${unit.phone.replace(/\D/g, "")}`}
                        className="text-gray-400 transition-colors hover:text-[#FF4757]"
                      >
                        {unit.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-[#FF4757]" />
                      <a
                        href={`mailto:${unit.email}`}
                        className="text-gray-400 transition-colors hover:text-[#FF4757]"
                      >
                        {unit.email}
                      </a>
                    </p>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-xl border" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
                    <iframe
                      title={`Mapa ${unit.city}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(unit.address + ", " + unit.city + ", SC")}&output=embed`}
                      width="100%"
                      height="180"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open(unit.mapsDirUrl, "_blank")}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-bold transition-all"
                    style={{
                      borderColor: "#FF4757",
                      color: "#FF4757",
                      background: "transparent",
                    }}
                  >
                    <Navigation className="h-5 w-5" />
                    Como Chegar
                  </button>
                </div>
              ))}

              <div
                className="rounded-2xl border p-6"
                style={{
                  background: "rgba(255, 71, 87, 0.15)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                }}
              >
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="h-5 w-5 text-[#FF4757]" />
                  <div>
                    <p className="text-sm font-semibold">
                      Horário de Atendimento
                    </p>
                    <p className="text-sm text-gray-400">
                      {ct.horario ?? "Segunda a Sexta, 08h às 18h"}
                      Segunda a Sexta, 08h às 18h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
