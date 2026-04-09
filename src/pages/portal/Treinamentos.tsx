import { useState, useMemo } from "react";
import {
  PlayCircle,
  Search,
  Filter,
  Clock,
  Eye,
  Video,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { trainingVideos } from "@/data/portalData";

export default function Treinamentos() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Filtrar apenas vídeos gratuitos (fonte estática)
  const freeVideos = useMemo(
    () => trainingVideos.filter((video) => !video.isPremium),
    []
  );

  // Aplicar filtros (evita recalcular a cada render)
  const filteredVideos = useMemo(() => {
    return freeVideos.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [freeVideos, searchQuery, selectedCategory]);

  // Categorias únicas dos vídeos gratuitos
  const categories = useMemo(
    () => ["all", ...new Set(freeVideos.map((v) => v.category))],
    [freeVideos]
  );

  const videoToPlay = selectedVideo
    ? trainingVideos.find((v) => v.id === selectedVideo)
    : null;

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
          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 71, 87, 0.2) 0%, rgba(255, 71, 87, 0.1) 100%)",
                }}
              >
                <GraduationCap className="h-6 w-6 text-[#FF4757]" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white">
                  Treinamentos Gratuitos
                </h1>
                <p className="text-sm text-gray-400">
                  Olá, {user?.name}! Aprenda a usar o sistema com nossos vídeos
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
                borderColor: "rgba(255, 71, 87, 0.25)",
              }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Busca */}
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar vídeos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                    style={{ borderColor: "rgba(255, 71, 87, 0.3)" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(255, 71, 87, 0.6)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255, 71, 87, 0.3)")
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
                      borderColor: "rgba(255, 71, 87, 0.3)",
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
                  ? "vídeo disponível"
                  : "vídeos disponíveis"}
              </div>
            </div>
          </div>

          {/* Grid de Vídeos */}
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
                  borderColor: "rgba(255, 71, 87, 0.25)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
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
                  {/* Badge Categoria */}
                  <div
                    className="absolute left-2 top-2 rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: "rgba(255, 71, 87, 0.9)",
                      color: "#ffffff",
                    }}
                  >
                    {video.category}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-200 transition-colors group-hover:text-[#FF4757]">
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
                    background: "rgba(255, 71, 87, 0.1)",
                  }}
                >
                  <Video className="h-8 w-8 text-gray-500" />
                </div>
              </div>
              <p className="text-lg text-gray-400">
                Nenhum vídeo encontrado com os filtros selecionados.
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
              className="absolute -top-12 right-0 text-white hover:text-[#FF4757]"
            >
              ✕ Fechar
            </button>

            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                className="h-full w-full"
                src={videoToPlay.videoUrl}
                title="Vídeo de Treinamento"
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
