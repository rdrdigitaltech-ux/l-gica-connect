import { useState, useMemo } from "react";
import {
  FileText,
  Download,
  Search,
  BookOpen,
  Filter,
  Calendar,
  Eye,
  File,
  FileArchive,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  knowledgeFiles,
  knowledgeCategories,
  type KnowledgeFile,
} from "@/data/portalData";

export default function BaseConhecimento() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filtrar arquivos (evita recalcular a cada render)
  const filteredFiles = useMemo(() => {
    return knowledgeFiles.filter((file) => {
      const matchesSearch =
        file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || file.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Ícone por tipo de arquivo
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6" />;
      case "zip":
        return <FileArchive className="h-6 w-6" />;
      case "video":
        return <Eye className="h-6 w-6" />;
      default:
        return <File className="h-6 w-6" />;
    }
  };

  // Cor por tipo
  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "#EF4444";
      case "zip":
        return "#8B5CF6";
      case "video":
        return "#3B82F6";
      default:
        return "#6B7280";
    }
  };

  // Handle download
  const handleDownload = (file: KnowledgeFile) => {
    if (file.type === "video") {
      window.open(file.url, "_blank");
      return;
    }
    // Simulação de download para PDF/ZIP
    alert(
      `Download iniciado: ${file.title}\n\nEm produção, o arquivo será baixado automaticamente.`
    );
    /* IMPLEMENTAÇÃO REAL:
    window.open(file.url, '_blank');
    fetch('/api/portal/registrar-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileId: file.id, userId: user?.id }),
    });
    */
  };

  return (
    <div className="relative min-h-screen" style={{ background: "#000000" }}>
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
                <BookOpen className="h-6 w-6 text-[#FF4757]" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white">
                  Base de Conhecimento
                </h1>
                <p className="text-sm text-gray-400">
                  Olá, {user?.name}! Acesse manuais, drivers e tutoriais
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
                    placeholder="Buscar arquivos..."
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
                    {knowledgeCategories.map((cat) => (
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

              {/* Contador de Resultados */}
              <div className="mt-4 text-sm text-gray-400">
                {filteredFiles.length}{" "}
                {filteredFiles.length === 1
                  ? "arquivo encontrado"
                  : "arquivos encontrados"}
              </div>
            </div>
          </div>

          {/* Grid de Arquivos */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="group overflow-hidden rounded-2xl border transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Header do Card */}
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg"
                      style={{
                        background: `${getTypeColor(file.type)}20`,
                        color: getTypeColor(file.type),
                      }}
                    >
                      {getFileIcon(file.type)}
                    </div>

                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: "rgba(255, 71, 87, 0.15)",
                        color: "#FF4757",
                      }}
                    >
                      {file.category}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-200 transition-colors group-hover:text-[#FF4757]">
                    {file.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm text-gray-400">
                    {file.description}
                  </p>

                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{file.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(file.updatedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{file.downloadCount}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(file)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-white"
                    style={{ background: "#FF4757" }}
                  >
                    <Download className="h-4 w-4" />
                    {file.type === "video" ? "Assistir" : "Baixar"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem se não houver resultados */}
          {filteredFiles.length === 0 && (
            <div className="py-20 text-center">
              <div className="mb-4 flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(255, 71, 87, 0.1)",
                  }}
                >
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
              </div>
              <p className="text-lg text-gray-400">
                Nenhum arquivo encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
