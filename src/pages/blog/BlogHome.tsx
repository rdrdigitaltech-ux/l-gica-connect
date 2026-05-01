import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  blogPosts,
  blogCategories,
  getRecentPosts,
} from "@/data/blogPosts";
<<<<<<< HEAD
import { useSiteContent } from "@/hooks/useSiteContent";

export default function BlogHome() {
  const { content: bl } = useSiteContent("blog");
=======

export default function BlogHome() {
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filtrar posts (evita recalcular a cada render)
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Posts recentes para sidebar (lista estática, memoizada)
  const recentPosts = useMemo(() => getRecentPosts(5), []);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      {/* ========== HERO SECTION ========== */}
      <section
        className="relative overflow-hidden py-32"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
        }}
      >
        {/* Flash de luz */}
        <div
          className="pointer-events-none absolute -left-[10%] top-[20%] z-0"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.15) 0%, rgba(255, 71, 87, 0.05) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
<<<<<<< HEAD
              {bl.hero_titulo ?? "Blog & Notícias"}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              {bl.hero_subtitulo ?? "Dicas, novidades e conteúdo sobre automação comercial e tecnologia."}
=======
              Blog Lógica
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Dicas, tutoriais e novidades sobre gestão comercial, automação e
              tecnologia para o seu negócio.
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
            </p>
          </div>
        </div>
      </section>

      {/* ========== BARRA DE BUSCA E FILTROS ========== */}
      <section
        className="relative overflow-hidden py-8"
        style={{ background: "#0A0C10" }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Busca */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF4757]"
                style={{
                  borderColor: "rgba(255, 71, 87, 0.3)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 71, 87, 0.6)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 71, 87, 0.3)";
                }}
              />
            </div>

            {/* Filtro por Categoria (Mobile) */}
            <div className="flex items-center gap-2 md:hidden">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 rounded-lg border bg-transparent px-4 py-3 text-gray-200"
                style={{
                  borderColor: "rgba(255, 71, 87, 0.3)",
                  background: "#12141A",
                }}
              >
                <option value="all" style={{ background: "#12141A" }}>
                  Todas as Categorias
                </option>
                {blogCategories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.name}
                    style={{ background: "#12141A" }}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTEÚDO PRINCIPAL (GRID + SIDEBAR) ========== */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* ========== COLUNA PRINCIPAL - GRID DE POSTS ========== */}
            <div className="lg:col-span-8">
              {/* Contador de resultados */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1
                    ? "artigo encontrado"
                    : "artigos encontrados"}
                </p>
              </div>

              {/* Grid de Posts */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                      borderColor: "rgba(255, 71, 87, 0.25)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      {/* Imagem de Capa */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          width={640}
                          height={360}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                        {/* Badge da Categoria */}
                        <div
                          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
                          style={{
                            background: "rgba(255, 71, 87, 0.9)",
                            color: "#ffffff",
                          }}
                        >
                          {post.category}
                        </div>
                      </div>

                      {/* Conteúdo do Card */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime} min de leitura</span>
                          </div>
                          {post.views !== undefined && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views} visualizações</span>
                            </div>
                          )}
                        </div>

                        {/* Título */}
                        <h2 className="mb-3 text-xl font-bold text-gray-200 transition-colors group-hover:text-[#FF4757]">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="mb-4 line-clamp-3 text-sm text-gray-400">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="rounded-full px-2 py-1 text-xs"
                              style={{
                                background: "rgba(255, 71, 87, 0.1)",
                                color: "#FF4757",
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Link "Ler Mais" */}
                        <div className="flex items-center gap-2 text-sm font-medium text-[#FF4757] transition-colors group-hover:gap-3">
                          <span>Ler artigo completo</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Mensagem se não houver resultados */}
              {filteredPosts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-gray-400">
                    Nenhum artigo encontrado com os filtros selecionados.
                  </p>
                </div>
              )}
            </div>

            {/* ========== SIDEBAR (Desktop) ========== */}
            <aside className="hidden lg:col-span-4 lg:block">
              {/* Widget - Categorias */}
              <div
                className="mb-8 overflow-hidden rounded-2xl border p-6"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                }}
              >
                <h3 className="mb-4 text-lg font-bold text-gray-200">
                  Categorias
                </h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-all ${
                      selectedCategory === "all"
                        ? "bg-[#FF4757] font-bold text-white"
                        : "text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    Todas as Categorias
                  </button>
                  {blogCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-all ${
                        selectedCategory === cat.name
                          ? "bg-[#FF4757] font-bold text-white"
                          : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cat.name}</span>
                        <span className="text-xs opacity-70">
                          ({cat.count})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Widget - Posts Recentes */}
              <div
                className="mb-8 overflow-hidden rounded-2xl border p-6"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                }}
              >
                <h3 className="mb-4 text-lg font-bold text-gray-200">
                  Posts Recentes
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group block transition-all hover:translate-x-1"
                    >
                      <h4 className="mb-1 text-sm font-medium text-gray-300 transition-colors group-hover:text-[#FF4757]">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Widget - CTA */}
              <div
                className="overflow-hidden rounded-2xl border p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, #C1403D 0%, #D62828 50%, #A33431 100%)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                }}
              >
                <h3 className="mb-3 text-lg font-bold text-white">
                  Precisa de Ajuda?
                </h3>
                <p className="mb-4 text-sm text-gray-100">
                  Fale com nossa equipe e encontre a solução ideal para seu
                  negócio.
                </p>
                <Link to="/contato" className="block">
                  <span
                    className="inline-block w-full rounded-lg bg-white px-6 py-3 text-center text-sm font-bold"
                    style={{ color: "#FF4757" }}
                  >
                    Entrar em Contato
                  </span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
