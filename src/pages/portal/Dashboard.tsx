import { BookOpen, Video, FileText, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { knowledgeFiles, trainingVideos } from "@/data/portalData";

const cardStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
};

export default function Dashboard() {
  const { user, isPremium } = useAuth();
  const freeVideos = trainingVideos.filter((v) => !v.isPremium);

  return (
    <div className="min-h-screen" style={{ background: "#12141A" }}>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 md:text-3xl">
            Olá, {user?.name}
          </h1>
          <p className="mt-2 text-gray-400">
            Bem-vindo à área restrita. Use o menu para acessar base de
            conhecimento e treinamentos.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="rounded-2xl border p-6"
            style={cardStyle}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(255, 71, 87, 0.15)" }}
            >
              <FileText className="h-6 w-6 text-[#FF4757]" />
            </div>
            <p className="text-2xl font-bold text-gray-200">
              {knowledgeFiles.length}
            </p>
            <p className="text-sm text-gray-400">Documentos disponíveis</p>
          </div>
          <div
            className="rounded-2xl border p-6"
            style={cardStyle}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(255, 71, 87, 0.15)" }}
            >
              <Video className="h-6 w-6 text-[#FF4757]" />
            </div>
            <p className="text-2xl font-bold text-gray-200">
              {freeVideos.length}
            </p>
            <p className="text-sm text-gray-400">Treinamentos gratuitos</p>
          </div>
          <div
            className="rounded-2xl border p-6"
            style={cardStyle}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(255, 71, 87, 0.15)" }}
            >
              <BookOpen className="h-6 w-6 text-[#FF4757]" />
            </div>
            <p className="text-2xl font-bold text-gray-200">Base de Conhecimento</p>
            <p className="text-sm text-gray-400">Manuais e drivers</p>
          </div>
          <div
            className="rounded-2xl border p-6"
            style={cardStyle}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(255, 71, 87, 0.15)" }}
            >
              <TrendingUp className="h-6 w-6 text-[#FF4757]" />
            </div>
            <p className="text-2xl font-bold text-gray-200">
              {isPremium() ? "Premium" : "Standard"}
            </p>
            <p className="text-sm text-gray-400">Seu plano</p>
          </div>
        </div>
      </div>
    </div>
  );
}
