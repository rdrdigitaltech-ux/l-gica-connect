import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  PlayCircle,
  Search,
  Filter,
  Clock,
  Eye,
  Video,
  Crown,
  Lock,
  Star,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { trainingVideos } from "@/data/portalData";

export default function TreinamentosPremium() {
  const { user, isPremium } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Filtrar apenas vídeos premium (fonte estática)
  const premiumVideos = useMemo(
    () => trainingVideos.filter((video) => video.isPremium),
    []
  );

  // Aplicar filtros (evita recalcular a cada render)
  const filteredVideos = useMemo(() => {
    return premiumVideos.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [premiumVideos, searchQuery, selectedCategory]);

  // Categorias únicas dos vídeos premium
  const categories = useMemo(
    () => ["all", ...new Set(premiumVideos.map((v) => v.category))],
    [premiumVideos]
  );

  const videoToPlay = selectedVideo
    ? trainingVideos.find((v) => v.id === selectedVideo)
    : null;

  // Se NÃO é premium, mostrar bloqueio
  if (!isPremium()) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "#000000" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
          }}
        />

        {/* Flash dourado */}
        <div
          className="pointer-events-none absolute -left-[20%] top-[20%] z-0"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0.05) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        <div className="relative z-10 w-full max-w-2xl px-4">
          <div
            className="rounded-2xl border p-12 text-center"
            style={{
              background:
                "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
              borderColor: "rgba(234, 179, 8, 0.5)",
              boxShadow: "0 20px 60px rgba(234, 179, 8, 0.2)",
            }}
          >
            {/* Ícone de Bloqueio Premium */}
            <div className="mb-6 flex justify-center">
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(234, 179, 8, 0.1) 100%)",
                  boxShadow: "0 0 60px rgba(234, 179, 8, 0.3)",
                }}
              >
                <Crown className="h-12 w-12 text-[#EAB308]" />
                <div className="absolute -bottom-1 -right-1">
                  <Lock className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            </div>

            <h2 className="mb-4 text-3xl font-extrabold text-white">
              Conteúdo Premium
            </h2>

            <p className="mb-8 text-lg text-gray-400">
              Os treinamentos avançados são exclusivos para usuários Premium.
              Desbloqueie acesso a conteúdos especializados e aprenda técnicas
              profissionais.
            </p>

            {/* Benefícios Premium */}
            <div
              className="mb-8 rounded-lg p-6 text-left"
              style={{
                background: "rgba(234, 179, 8, 0.1)",
                border: "1px solid rgba(234, 179, 8, 0.3)",
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#EAB308]" />
                <h3 className="font-bold text-[#EAB308]">
                  O que você ganha com Premium:
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#EAB308]" />
                  Treinamentos avançados e especializados
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#EAB308]" />
                  Acesso a novos vídeos assim que lançados
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#EAB308]" />
                  Certificados de conclusão
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#EAB308]" />
                  Suporte prioritário
                </li>
              </ul>
            </div>

            {/* Botão de Contato */}
            <div className="flex w-full">
              <Link
                to="/contato"
                className="flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-black"
                style={{
                  background:
                    "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)",
                  boxShadow: "0 6px 20px rgba(234, 179, 8, 0.35)",
                }}
              >
                <Crown className="h-5 w-5" />
                Solicitar Upgrade Premium
              </Link>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              Entre em contato conosco para saber mais sobre o plano Premium
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se É premium, mostrar conteúdo
  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
        }}
      />

      {/* Container Principal */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div>
          {/* Header com Badge Premium */}
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(234, 179, 8, 0.1) 100%)",
                }}
              >
                <Crown className="h-6 w-6 text-[#EAB308]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-extrabold text-white">
                    Treinamentos Premium
                  </h1>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)",
                      color: "#000",
                    }}
                  >
                    ⭐ PREMIUM
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Olá, {user?.name}! Conteúdo exclusivo premium
                </p>
              </div>
            </div>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="mb-8">
            <div
              className="rounded-2xl border p-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                borderColor: "rgba(234, 179, 8, 0.3)",
              }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Busca */}
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar vídeos premium..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                    style={{ borderColor: "rgba(234, 179, 8, 0.3)" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(234, 179, 8, 0.6)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(234, 179, 8, 0.3)")
                    }
                  />
                </div>

                {/* Filtro por Categoria */}
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-lg border bg-transparent px-4 py-3 text-sm text-gray-200"
                    style={{
                      borderColor: "rgba(234, 179, 8, 0.3)",
                      background: "#12141A",
                    }}
                  >
                    <option value="all" style={{ background: "#12141A" }}>
                      Todas as Categorias
                    </option>
                    {categories
                      .filter((c) => c !== "all")
                      .map((cat) => (
                        <option
                          key={cat}
                          value={cat}
                          style={{ background: "#12141A" }}
                        >
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                {filteredVideos.length}{" "}
                {filteredVideos.length === 1
                  ? "vídeo premium disponível"
                  : "vídeos premium disponíveis"}
              </div>
            </div>
          </div>

          {/* Grid de Vídeos Premium */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                role="button"
                tabIndex={0}
                className="group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  borderColor: "rgba(234, 179, 8, 0.3)",
                  boxShadow: "0 8px 24px rgba(234, 179, 8, 0.1)",
                }}
                onClick={() => setSelectedVideo(video.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedVideo(video.id);
                  }
                }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                  {/* Duração */}
                  <div
                    className="absolute bottom-2 right-2 rounded px-2 py-1 text-xs font-bold text-white"
                    style={{ background: "rgba(0, 0, 0, 0.8)" }}
                  >
                    {video.duration}
                  </div>
                  {/* Badge Premium */}
                  <div
                    className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)",
                      color: "#000",
                    }}
                  >
                    <Crown className="h-3 w-3" />
                    Premium
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-200 transition-colors group-hover:text-[#EAB308]">
                    {video.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm text-gray-400">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>
                        {video.views.toLocaleString()} visualizações
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem se não houver resultados */}
          {filteredVideos.length === 0 && (
            <div className="py-20 text-center">
              <div className="mb-4 flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(234, 179, 8, 0.1)",
                  }}
                >
                  <Video className="h-8 w-8 text-[#EAB308]" />
                </div>
              </div>
              <p className="text-lg text-gray-400">
                Nenhum vídeo premium encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Vídeo */}
      {selectedVideo && videoToPlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#EAB308]"
            >
              ✕ Fechar
            </button>

            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                className="h-full w-full"
                src={videoToPlay.videoUrl}
                title="Vídeo Premium"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
