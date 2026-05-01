import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function LocationSection() {
  const { content: contato } = useSiteContent("contato");

  const units = [
    {
      city: "Brusque",
      address: contato?.endereco_brusque ?? "Av. Dom Joaquim, 437 - Jardim Maluche",
      phone: contato?.telefone_brusque ?? "(47) 3351-5497",
      email: contato?.email ?? "atendimento@logica.inf.br",
      mapsDirUrl:
        contato?.maps_brusque ??
        "https://www.google.com/maps/dir/?api=1&destination=-27.10681,-48.92285",
    },
    {
      city: "Blumenau",
      address: contato?.endereco_blumenau ?? "R. Dois de Setembro, 4115 - Itoupava Norte",
      phone: contato?.telefone_blumenau ?? "(47) 3328-0077",
      email: contato?.email ?? "atendimento@logica.inf.br",
      mapsDirUrl:
        contato?.maps_blumenau ??
        "https://www.google.com/maps/dir/?api=1&destination=-26.9234,-49.0662",
    },
  ];

  const horario = contato?.horario ?? "Segunda a Sexta, 08h às 18h";

  return (
    <section
      className="relative overflow-hidden py-16 transition-colors duration-300 md:py-20 lg:py-24"
        style={{
          background:
            "linear-gradient(180deg, #12141A 0%, #0A0C10 70%, #06080A 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Overlay de transição da seção anterior */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-32"
        style={{
          background: "linear-gradient(180deg, #0A0C10 0%, transparent 100%)",
        }}
      />
      {/* Overlay inferior para transição ao footer */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-24"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #06080A 100%)",
        }}
      />
      {/* Flash de luz vermelha - opacidade reduzida */}
      <div
        className="pointer-events-none absolute -left-[8%] -top-[12%] z-0"
        style={{
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 40%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* Flash de luz vermelha - canto inferior direito */}
      <div
        className="pointer-events-none absolute -bottom-[10%] -right-[8%] z-0"
        style={{
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 40%, transparent 80%)",
          filter: "blur(66px)",
        }}
      />

      {/* Flash central vertical - opacidade reduzida */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 300,
          height: 700,
          background:
            "radial-gradient(ellipse, rgba(255, 71, 87, 0.05) 0%, transparent 80%)",
          filter: "blur(72px)",
        }}
      />

      {/* Dot pattern sutil */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(230, 57, 70, 1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10">
        <div className="container-narrow mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-4 text-2xl font-extrabold text-gray-200 md:text-3xl lg:text-4xl">
              Onde Estamos
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-gray-400 md:text-base">
              Atendemos todo o estado de Santa Catarina com sedes em Brusque e Blumenau
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {units.map((unit) => (
              <div
                key={unit.city}
                className="rounded-2xl"
                style={{ padding: "2px", overflow: "visible" }}
              >
                <div
                  className="group relative h-full overflow-hidden rounded-2xl border p-6 md:p-8"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(15, 17, 21, 0.8) 0%, rgba(12, 14, 17, 0.8) 100%)",
                    borderColor: "rgba(230, 57, 70, 0.25)",
                    boxShadow:
                      "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(230, 57, 70, 0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                {/* Reflexo de luz superior */}
                <div
                  className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.6), transparent)",
                    boxShadow: "0 0 10px rgba(230, 57, 70, 0.4)",
                  }}
                />

                {/* Reflexo diagonal animado */}
                <div
                  className="pointer-events-none absolute -right-[100%] -top-[100%] h-[200%] w-[200%] opacity-0 transition-all duration-700 group-hover:-right-1/2 group-hover:opacity-100 group-hover:-top-1/2"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 35%, rgba(230, 57, 70, 0.15) 50%, transparent 65%)",
                    transform: "rotate(45deg)",
                  }}
                />

                {/* Glow interno no hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(230, 57, 70, 0.1) 0%, transparent 60%)",
                  }}
                />

                {/* Badge da cidade com ícone */}
                <div className="relative z-10 mb-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(230, 57, 70, 0.15)",
                      border: "1px solid rgba(230, 57, 70, 0.3)",
                    }}
                  >
                    <MapPin className="h-5 w-5" style={{ color: "#E63946" }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-200 md:text-2xl">
                    {unit.city}
                  </h3>
                </div>

                {/* Informações da unidade */}
                  <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                      <MapPin className="h-4 w-4 text-[#E63946]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-300">Endereço</p>
                      <p className="mt-1 text-gray-400">{unit.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                      <Phone className="h-4 w-4 text-[#E63946]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-300">Telefone</p>
                      <p className="mt-1 text-gray-400">{unit.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                      <Mail className="h-4 w-4 text-[#E63946]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-300">Email</p>
                      <p className="mt-1 text-gray-400">{unit.email}</p>
                    </div>
                  </div>
                </div>

                {/* Horário de atendimento */}
                <div
                  className="relative z-10 mt-6 rounded-lg border p-4 text-center"
                  style={{
                    borderColor: "rgba(230, 57, 70, 0.2)",
                    background: "rgba(230, 57, 70, 0.05)",
                  }}
                >
                  <p className="text-sm font-semibold text-gray-300">
                    Horário de Atendimento
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    {horario}
                  </p>
                </div>

                {/* Mapa */}
                <div
                  className="relative z-10 mt-6 overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: "rgba(230, 57, 70, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <iframe
                    title={`Mapa ${unit.city}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(unit.address + ", " + unit.city + ", SC")}&output=embed`}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>

                {/* Como Chegar */}
                <button
                  type="button"
                  onClick={() => window.open(unit.mapsDirUrl, "_blank")}
                  className="relative z-10 mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-bold transition-colors hover:bg-[rgba(255,71,87,0.1)]"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
