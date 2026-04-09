import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Filter, X } from "lucide-react";

const equipamentos = [
  {
    id: 1,
    nome: "Balanças",
    descricao: "Balanças eletrônicas de alta precisão",
    imagem: "/img/balança.webp",
    link: "/equipamentos/balancas",
    categoria: "Pesagem",
    marca: ["Toledo", "Filizola", "Urano"],
    tipo: "Automação",
  },
  {
    id: 2,
    nome: "Impressoras Fiscais",
    descricao: "Impressoras homologadas e térmicas",
    imagem: "/img/impressora_fiscal.webp",
    link: "/equipamentos/impressoras",
    categoria: "Impressão",
    marca: ["Bematech", "Epson", "Daruma"],
    tipo: "Fiscal",
  },
  {
    id: 3,
    nome: "Relógios de Ponto",
    descricao: "Controle de acesso e ponto eletrônico",
    imagem: "/img/relogio_ponto.webp",
    link: "/equipamentos/relogio-ponto",
    categoria: "Controle de ponto",
    marca: ["Henry", "Dimep", "Topdata"],
    tipo: "Gestão",
  },
  {
    id: 4,
    nome: "Leitores de Código de Barras",
    descricao: "Scanners e leitores de alta performance",
    imagem: "/img/leitor_codigo_barras.webp",
    link: "/equipamentos/leitor-codigo",
    categoria: "Identificação",
    marca: ["Symbol", "Honeywell", "Datalogic"],
    tipo: "Automação",
  },
  {
    id: 5,
    nome: "Embaladoras",
    descricao: "Seladoras e máquinas de embalar",
    imagem: "/img/embaladoras.webp",
    link: "/equipamentos/embaladoras",
    categoria: "Embalagem",
    marca: ["Barbi", "Selovac", "Cetro"],
    tipo: "Automação",
  },
  {
    id: 6,
    nome: "Computadores e Hardwares",
    descricao: "PCs, nobreaks, teclados e periféricos",
    imagem: "/img/computadores.webp",
    link: "/equipamentos/computadores",
    categoria: "Informática",
    marca: ["Bematech", "Elgin", "Sweda"],
    tipo: "Hardware",
  },
];

const cardStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
};

export default function Equipamentos() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const categorias = useMemo(() => {
    const cats = equipamentos.map((eq) => eq.categoria);
    return ["Todas", ...Array.from(new Set(cats))];
  }, []);

  const tipos = useMemo(() => {
    const allTipos = equipamentos.map((eq) => eq.tipo);
    return ["Todos", ...Array.from(new Set(allTipos))];
  }, []);

  const equipamentosFiltrados = useMemo(() => {
    return equipamentos.filter((equipamento) => {
      const matchCategoria =
        !filtroCategoria ||
        filtroCategoria === "Todas" ||
        equipamento.categoria === filtroCategoria;
      const matchTipo =
        !filtroTipo ||
        filtroTipo === "Todos" ||
        equipamento.tipo === filtroTipo;
      return matchCategoria && matchTipo;
    });
  }, [filtroCategoria, filtroTipo]);

  const limparFiltros = () => {
    setFiltroCategoria("");
    setFiltroTipo("");
  };

  const filtrosAtivos = !!filtroCategoria || !!filtroTipo;

  return (
    <div className="min-h-screen bg-[#0A0C10]">
      {/* 1. HERO */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#FF4757]">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Equipamentos</span>
          </nav>

          <h1
            className="mb-6 font-extrabold text-gray-200"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            EQUIPAMENTOS
          </h1>

          <p
            className="max-w-3xl text-gray-400"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
          >
            Os melhores equipamentos de automação e informática. Escolhas
            inteligentes para o seu negócio.
          </p>
        </div>
      </section>

      {/* 2. BARRA DE FILTROS */}
      <section className="py-8" style={{ background: "#12141A" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <h3 className="text-lg font-bold text-gray-200">
              {equipamentosFiltrados.length}{" "}
              {equipamentosFiltrados.length === 1
                ? "equipamento encontrado"
                : "equipamentos encontrados"}
            </h3>
            <button
              type="button"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-gray-200"
              style={{ borderColor: "rgba(255, 71, 87, 0.3)" }}
            >
              <Filter className="h-4 w-4" />
              Filtros
            </button>
          </div>

          <div
            className={`overflow-hidden rounded-2xl border p-6 ${
              !mostrarFiltros ? "hidden lg:block" : ""
            }`}
            style={{
              background:
                "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
              borderColor: "rgba(255, 71, 87, 0.25)",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#FF4757]" />
                <h3 className="text-lg font-bold text-gray-200">
                  Filtrar Equipamentos
                </h3>
              </div>

              {filtrosAtivos && (
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="flex items-center gap-2 text-sm text-[#FF4757] hover:underline"
                >
                  <X className="h-4 w-4" />
                  Limpar Filtros
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="filtro-categoria"
                  className="mb-2 block text-sm font-semibold text-gray-400"
                >
                  Categoria
                </label>
                <select
                  id="filtro-categoria"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="w-full rounded-lg border bg-transparent px-4 py-3 text-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF4757]"
                  style={{ borderColor: "rgba(255, 71, 87, 0.3)" }}
                >
                  {categorias.map((cat) => (
                    <option
                      key={cat}
                      value={cat === "Todas" ? "" : cat}
                      className="bg-[#0A0C10]"
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="filtro-tipo"
                  className="mb-2 block text-sm font-semibold text-gray-400"
                >
                  Tipo
                </label>
                <select
                  id="filtro-tipo"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full rounded-lg border bg-transparent px-4 py-3 text-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF4757]"
                  style={{ borderColor: "rgba(255, 71, 87, 0.3)" }}
                >
                  {tipos.map((tipo) => (
                    <option
                      key={tipo}
                      value={tipo === "Todos" ? "" : tipo}
                      className="bg-[#0A0C10]"
                    >
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filtrosAtivos && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-800 pt-4">
                <span className="text-sm text-gray-400">Filtros ativos:</span>
                {filtroCategoria && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FF4757]/20 px-3 py-1 text-sm text-[#FF4757]">
                    {filtroCategoria}
                    <button
                      type="button"
                      onClick={() => setFiltroCategoria("")}
                      aria-label={`Remover filtro ${filtroCategoria}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filtroTipo && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FF4757]/20 px-3 py-1 text-sm text-[#FF4757]">
                    {filtroTipo}
                    <button
                      type="button"
                      onClick={() => setFiltroTipo("")}
                      aria-label={`Remover filtro ${filtroTipo}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 border-t border-gray-800 pt-4">
              <p className="text-center text-sm text-gray-400">
                Exibindo{" "}
                <span className="font-bold text-[#FF4757]">
                  {equipamentosFiltrados.length}
                </span>{" "}
                de <span className="font-bold">{equipamentos.length}</span>{" "}
                equipamentos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRID DE EQUIPAMENTOS */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div
          className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
          style={{
            width: 550,
            height: 550,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-[12%] -right-[10%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
            filter: "blur(110px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {equipamentosFiltrados.map((equipamento) => (
              <Link
                key={equipamento.id}
                to={equipamento.link}
                className="block"
              >
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border p-8 transition-all duration-500"
                  style={cardStyle}
                >
                  <div
                    className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)",
                      boxShadow: "0 0 8px rgba(255, 71, 87, 0.5)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 0% 0%, rgba(255, 71, 87, 0.2) 0%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />

                  <div className="relative z-10 mb-6 flex h-48 items-center justify-center">
                    <img
                      src={equipamento.imagem}
                      alt={equipamento.nome}
                      width={800}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-auto object-contain"
                      style={{
                        filter:
                          "drop-shadow(0 10px 30px rgba(255, 71, 87, 0.2))",
                      }}
                    />
                  </div>

                  <h3 className="relative z-10 mb-3 text-center text-xl font-bold text-gray-200">
                    {equipamento.nome}
                  </h3>
                  <p className="relative z-10 text-center text-sm text-gray-400">
                    {equipamento.descricao}
                  </p>

                  <div className="relative z-10 mt-4 flex items-center justify-center gap-2 text-xs font-medium text-gray-500 transition-colors group-hover:text-[#FF4757]">
                    <span>Ver Detalhes</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {equipamentosFiltrados.length === 0 && (
            <div className="py-20 text-center">
              <p className="mb-4 text-xl text-gray-400">
                Nenhum equipamento encontrado com os filtros selecionados.
              </p>
              <button
                type="button"
                onClick={limparFiltros}
                className="rounded-lg bg-[#FF4757] px-6 py-3 font-bold text-white"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div
          className="pointer-events-none absolute -left-[8%] -top-[12%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-extrabold text-gray-200 lg:text-4xl">
            Precisa de orientação para escolher o equipamento ideal?
          </h2>

          <p className="mb-8 text-base text-gray-400 lg:text-lg">
            Nossa equipe está pronta para ajudar você a encontrar a melhor
            solução para o seu negócio
          </p>

          <button
            type="button"
            onClick={() =>
              window.open(
                "https://wa.me/5547984218275?text=" +
                  encodeURIComponent(
                    "Olá! Preciso de orientação para escolher o equipamento ideal para o meu negócio. Pode me ajudar?"
                  ),
                "_blank"
              )
            }
            className="inline-flex items-center gap-2 rounded-lg px-10 py-4 text-base font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
            }}
          >
            Fale com um Especialista
          </button>
        </div>
      </section>
    </div>
  );
}
