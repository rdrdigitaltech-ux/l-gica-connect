/**
 * SistemaDinamico.tsx
 * Layout idêntico ao SistemaVarejo.tsx — usado para sistemas criados pelo admin.
 */

import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Check,
  MessageCircle,
  ArrowLeft,
  Zap,
  BarChart2,
  Shield,
  Settings,
  Star,
  Package,
  FileText,
  Tag,
  DollarSign,
  Monitor,
  ShoppingBag,
  Clock,
  Users,
  TrendingUp,
  Database,
  Globe,
  Layers,
} from "lucide-react";
import { useSistemasExtras } from "@/lib/dynamicItems";

/** Pool de ícones que rotacionam pelos cards de vantagem */
const ICONS_POOL = [
  Zap, BarChart2, Shield, Settings, Star, Package,
  FileText, Tag, DollarSign, Monitor, ShoppingBag, Clock,
  Users, TrendingUp, Database, Globe, Layers, Check,
];

export default function SistemaDinamico() {
  const { slug } = useParams<{ slug: string }>();
  const sistemas = useSistemasExtras();
  const sistema = sistemas.find((s) => s.slug === slug);

  if (!sistema) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0A0C10] text-center px-4">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(255,71,87,0.12)" }}
        >
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-200">Sistema não encontrado</h1>
        <p className="text-gray-500">
          O sistema que você está buscando não existe ou foi removido.
        </p>
        <Link
          to="/sistemas"
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition"
          style={{ background: "#FF4757" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Ver todos os sistemas
        </Link>
      </div>
    );
  }

  const features = sistema.features
    ? sistema.features.split("\n").filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[#0A0C10]">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#FF4757]">Início</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/sistemas" className="transition-colors hover:text-[#FF4757]">Sistemas</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">{sistema.nome}</span>
          </nav>

          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            style={{ background: "rgba(255, 71, 87, 0.1)", borderColor: "rgba(255, 71, 87, 0.3)" }}
          >
            {sistema.emoji && <span className="text-base leading-none">{sistema.emoji}</span>}
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              {sistema.hero_badge || sistema.nome}
            </span>
          </div>

          {/* Título */}
          <h1
            className="mb-6 font-extrabold leading-tight text-gray-200"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {sistema.hero_titulo || sistema.nome}
          </h1>

          {/* Subtítulo */}
          <p
            className="mb-8 max-w-3xl text-gray-400"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
          >
            {sistema.hero_subtitulo || sistema.descricao}
          </p>
        </div>
      </section>

      {/* ── 2. COMO FUNCIONA (exibido apenas se houver imagem ou descrição) ── */}
      {(sistema.imagem || sistema.descricao) && (
        <section className="relative overflow-hidden py-24" style={{ background: "#0A0C10" }}>
          <div
            className="pointer-events-none absolute -left-[10%] -top-[15%] z-0"
            style={{
              width: 550, height: 550,
              background: "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Imagem à esquerda */}
              {sistema.imagem && (
                <div className="relative">
                  <div
                    className="relative overflow-hidden rounded-2xl border p-4"
                    style={{
                      background: "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                      borderColor: "rgba(255, 71, 87, 0.25)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                      aspectRatio: "16/9",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)" }}
                    />
                    <img
                      src={sistema.imagem}
                      alt={sistema.nome}
                      width={1600}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full rounded-lg object-cover"
                      style={{ filter: "drop-shadow(0 10px 30px rgba(255, 71, 87, 0.2))", objectPosition: "center" }}
                    />
                  </div>
                </div>
              )}

              {/* Texto à direita */}
              <div className={sistema.imagem ? "" : "lg:col-span-2"}>
                <h2 className="mb-6 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                  Como funciona?
                </h2>
                <p className="mb-8 text-base leading-relaxed text-gray-400 lg:text-lg">
                  {sistema.descricao || sistema.hero_subtitulo}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://wa.me/5547984218275?text=" +
                        encodeURIComponent(
                          `Olá! Tenho interesse no sistema ${sistema.nome}. Gostaria de falar com um especialista sobre funcionalidades, valores e implantação.`
                        ),
                      "_blank"
                    )
                  }
                  className="inline-flex items-center gap-3 rounded-lg px-8 py-3 text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                  }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. VANTAGENS / FUNCIONALIDADES ───────────────────────────── */}
      {features.length > 0 && (
        <section className="relative overflow-hidden py-24" style={{ background: "#12141A" }}>
          <div
            className="pointer-events-none absolute -right-[10%] -top-[15%] z-0"
            style={{
              width: 500, height: 500,
              background: "radial-gradient(circle, rgba(255, 71, 87, 0.08) 0%, rgba(255, 71, 87, 0.03) 50%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold text-gray-200 lg:text-4xl">
                VANTAGENS
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feat, idx) => {
                const Icon = ICONS_POOL[idx % ICONS_POOL.length];
                return (
                  <div
                    key={feat}
                    className="group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500"
                    style={{
                      background: "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                      borderColor: "rgba(255, 71, 87, 0.25)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 71, 87, 0.55)";
                      e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.6), 0 0 40px rgba(255,71,87,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 71, 87, 0.25)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.4)";
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)",
                        boxShadow: "0 0 8px rgba(255, 71, 87, 0.5)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: "radial-gradient(circle at 0% 0%, rgba(255, 71, 87, 0.2) 0%, transparent 70%)",
                        filter: "blur(20px)",
                      }}
                    />
                    <div className="relative z-10 mb-6 flex justify-center">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-lg"
                        style={{
                          background: "rgba(255, 71, 87, 0.15)",
                          border: "1px solid rgba(255, 71, 87, 0.3)",
                        }}
                      >
                        <Icon className="h-8 w-8 text-[#FF4757]" />
                      </div>
                    </div>
                    <p className="relative z-10 text-center text-base font-semibold leading-relaxed text-gray-200">
                      {feat}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. CTA FINAL ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20" style={{ background: "#0A0C10" }}>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
            Pronto para melhorar sua empresa?
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            Converse com nossos especialistas e descubra como o sistema {sistema.nome} pode transformar a gestão do seu negócio.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://wa.me/5547984218275?text=" +
                    encodeURIComponent(
                      `Olá! Tenho interesse no sistema ${sistema.nome} da Lógica. Gostaria de saber mais sobre funcionalidades, valores e implantação.`
                    ),
                  "_blank"
                )
              }
              className="inline-flex items-center gap-3 rounded-lg px-8 py-4 text-lg font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
              }}
            >
              <MessageCircle className="h-6 w-6" />
              Falar com um especialista
            </button>
            <Link
              to="/sistemas"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700/60 px-6 py-4 text-sm font-semibold text-gray-400 transition hover:border-gray-600 hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver outros sistemas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
