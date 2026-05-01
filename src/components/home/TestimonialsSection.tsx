import { Quote, Star } from "lucide-react";

const cardBaseStyle = {
  background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  backdropFilter: "blur(10px)",
} as const;

const testimonials = [
  {
    quote:
      '"A parceria com a Lógica transformou completamente a gestão do nosso bar. Desde 1984 servindo qualidade e tradição, e agora com um sistema que agiliza nossos pedidos, controla o estoque e facilita o atendimento. Nossos clientes sentem a diferença na rapidez e precisão. Recomendo de olhos fechados!"',
    name: "Duda BelliBar",
    role: "Bar • Desde 1984",
    initial: "D",
  },
  {
    quote:
      '"Trabalho com varejo há mais de 15 anos e posso afirmar: a Lógica entrega o melhor custo-benefício da região. O sistema é intuitivo, o suporte é rápido e a manutenção dos equipamentos é impecável. Nossa loja ganhou produtividade e conseguimos focar no que realmente importa: atender bem nossos clientes."',
    name: "Marcelo Ferreira",
    role: "Mercado São José • Brusque",
    initial: "M",
  },
  {
    quote:
      '"Administro uma rede de farmácias e a Lógica nos atende há mais de 5 anos. A integração entre as lojas funciona perfeitamente, o controle de validades nos salvou de prejuízos e o suporte técnico sempre resolve tudo no mesmo dia. Confiança e qualidade em um só parceiro!"',
    name: "Ana Paula Costa",
    role: "Rede Farma Mais • Blumenau",
    initial: "A",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="relative hidden overflow-hidden py-24 transition-colors duration-300"
      style={{ background: "#0A0C10", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
    >
      {/* Flash de luz vermelha - opacidade reduzida */}
      <div
        className="pointer-events-none absolute -right-[8%] -top-[12%] z-0"
        style={{
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Flash de luz vermelha - canto inferior esquerdo */}
      <div
        className="pointer-events-none absolute -bottom-[10%] -left-[8%] z-0"
        style={{
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.06) 0%, rgba(255, 71, 87, 0.02) 50%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* Linha horizontal de luz central */}
      <div
        className="pointer-events-none absolute left-[20%] top-1/2 z-0 h-px w-[60%] -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.15), transparent)",
          boxShadow: "0 0 20px rgba(230, 57, 70, 0.2)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-200 md:text-4xl lg:text-5xl">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400">
            Conheça a experiência de quem confia na Lógica para transformar seus
            negócios
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:items-stretch">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-500 md:p-8"
              style={cardBaseStyle}
            >
              {/* Reflexo de luz superior */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.6), transparent)",
                  boxShadow: "0 0 8px rgba(230, 57, 70, 0.5)",
                }}
              />

              {/* Glow canto superior */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, rgba(230, 57, 70, 0.2) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Ícone de aspas */}
              <div className="mb-6 flex justify-start">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(230, 57, 70, 0.15)",
                    border: "1px solid rgba(230, 57, 70, 0.3)",
                  }}
                >
                  <Quote className="h-6 w-6 text-[#E63946]" />
                </div>
              </div>

              {/* Depoimento */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-300">
                {item.quote}
              </p>

              {/* Bloco fixo no rodapé do card (estrelas + divisor + nome) */}
              <div className="mt-auto">
                {/* Avaliação - 5 estrelas */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#E63946] text-[#E63946]"
                    />
                  ))}
                </div>

                {/* Divisor */}
                <div
                  className="mb-4 h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(230, 57, 70, 0.3), transparent)",
                  }}
                />

                {/* Informações do cliente */}
                <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(230, 57, 70, 0.3) 0%, rgba(230, 57, 70, 0.1) 100%)",
                    border: "2px solid rgba(230, 57, 70, 0.4)",
                    color: "#E63946",
                  }}
                >
                  {item.initial}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-200">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
