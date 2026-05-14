import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, Play, FileDown } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ImageZoom } from "@/components/ImageZoom";
import { getYoutubeEmbedUrl } from "@/lib/utils";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  findCategoriaBySlug,
  findProdutoInCategoria,
  useEquipamentosCatalog,
} from "@/lib/equipamentosCatalog";

const EquipamentoDetalhe = () => {
  const { categoriaSlug, modeloId } = useParams<{ categoriaSlug: string; modeloId: string }>();
  const navigate = useNavigate();
  const catalog = useEquipamentosCatalog();
  const { content: eq } = useSiteContent("equipamentos");

  const resolved = useMemo(() => {
    const slug = categoriaSlug ?? "";
    const mid = modeloId ?? "";
    const cat = findCategoriaBySlug(slug, catalog);
    if (!cat) {
      return { produto: null, nomeCategoria: "", categoriaInvalida: true as const };
    }
    const produto = findProdutoInCategoria(cat, mid);
    if (!produto || produto.ativo === false) {
      return {
        produto: null,
        nomeCategoria: cat.nome,
        categoriaInvalida: false as const,
        slug,
      };
    }
    return {
      produto,
      categoria: cat,
      nomeCategoria: cat.nome,
      categoriaInvalida: false as const,
      slug,
    };
  }, [categoriaSlug, modeloId, catalog]);

  const videoEmbedUrl = getYoutubeEmbedUrl(resolved.produto?.video_url ?? "");

  const galeriaUrls = useMemo(() => {
    const p = resolved.produto;
    if (!p) return [];
    const main = p.foto_principal?.trim();
    const rest = (p.galeria ?? []).map((u) => u.trim()).filter(Boolean);
    const ordered = main ? [main, ...rest.filter((u) => u !== main)] : rest;
    return Array.from(new Set(ordered));
  }, [resolved.produto]);

  const [fotoAtiva, setFotoAtiva] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFotoAtiva(0);
  }, [modeloId]);

  useEffect(() => {
    if (resolved.categoriaInvalida) {
      navigate("/equipamentos", { replace: true });
    }
  }, [resolved.categoriaInvalida, navigate]);

  if (resolved.categoriaInvalida) return null;

  const backPath =
    "slug" in resolved && resolved.slug
      ? `/equipamentos/${resolved.slug}`
      : "/equipamentos";

  const produto = resolved.produto;
  const whatsappMsg = produto
    ? `Olá! Gostaria de solicitar um orçamento para o produto: ${produto.nome}`
    : "Olá, gostaria de um orçamento!";

  const ctaTitulo    = produto?.cta_titulo?.trim()    || eq.cta_detalhe_titulo    || `Interessado no ${produto?.nome}?`;
  const ctaSubtitulo = produto?.cta_subtitulo?.trim() || eq.cta_detalhe_subtitulo || "Fale com nossa equipe e receba um orçamento personalizado.";
  const ctaTexto     = produto?.cta_texto?.trim()     || eq.cta_detalhe_btn       || "Orçar pelo WhatsApp";
  const ctaHref      = produto?.cta_link?.trim()
    || `https://wa.me/5547984218275?text=${encodeURIComponent(whatsappMsg)}`;

  const blocosOrdenados =
    produto?.blocos?.length && produto.blocos.length > 0
      ? [...produto.blocos].sort((a, b) => a.ordem - b.ordem)
      : [];

  return (
    <div className="min-h-screen bg-[#06080A]">
      <section className="bg-[#000000] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to={backPath}
            className="mb-6 inline-flex items-center gap-2 text-[#FF4757] transition-colors hover:text-[#FF4757]/80"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para {resolved.nomeCategoria || "equipamentos"}
          </Link>

          {produto ? (
            <>
              {produto.subcategoria?.trim() && (
                <div
                  className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                  style={{
                    background: "rgba(255, 71, 87, 0.15)",
                    border: "1px solid rgba(255, 71, 87, 0.3)",
                    color: "#FF4757",
                  }}
                >
                  {produto.subcategoria}
                </div>
              )}
              {produto.marca?.trim() && (
                <p className="mb-2 text-sm text-gray-500">Marca: {produto.marca}</p>
              )}
              <h1
                className="font-bold text-white"
                style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
              >
                {produto.nome}
              </h1>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-white">Produto não encontrado</h1>
          )}
        </div>
      </section>

      {produto ? (
        <>
          <section className="px-6 py-16">
            <div className="mx-auto max-w-7xl space-y-16 lg:space-y-20">
              {/* Linha principal: galeria | título + descrição + PDF + WhatsApp */}
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="w-full space-y-4">
                  {galeriaUrls[fotoAtiva] ? (
                    <ImageZoom
                      src={galeriaUrls[fotoAtiva]}
                      alt={produto.nome}
                      images={galeriaUrls.length > 1 ? galeriaUrls : undefined}
                    />
                  ) : (
                    <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-500">
                      Sem imagem principal
                    </div>
                  )}
                  {galeriaUrls.length > 1 && (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {galeriaUrls.map((url, i) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() => setFotoAtiva(i)}
                          className="overflow-hidden rounded-lg border transition-all hover:opacity-90 focus:outline-none"
                          style={{
                            borderColor: i === fotoAtiva ? "rgba(255,71,87,0.8)" : "rgba(255,255,255,0.1)",
                            boxShadow: i === fotoAtiva ? "0 0 0 2px rgba(255,71,87,0.4)" : "none",
                          }}
                        >
                          <img src={url} alt={`${produto.nome} — foto ${i + 1}`} className="h-20 w-full object-cover" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <h2 className="text-3xl font-bold text-white lg:text-4xl">
                    {produto.nome}
                  </h2>

                  {produto.texto_detalhado?.trim() ? (
                    <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-400">
                      {produto.texto_detalhado}
                    </p>
                  ) : (
                    <p className="text-gray-500">Descrição detalhada em breve.</p>
                  )}

                  {produto.pdf_url?.trim() && (
                    <a
                      href={produto.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <FileDown className="h-4 w-4" />
                      Baixar especificações técnicas (PDF)
                    </a>
                  )}

                  <div className="pt-4">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                        boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                      }}
                      onClick={() => window.open(ctaHref, "_blank")}
                    >
                      <MessageCircle className="h-5 w-5" />
                      {ctaTexto}
                    </button>
                  </div>
                </div>
              </div>

              {/* Blocos extras: mesma grade — imagem à esquerda (alinhada à principal), texto à direita */}
              {blocosOrdenados.map((sec) => {
                const hasImage = Boolean(sec.imagem?.trim());
                const hasText = Boolean(sec.texto?.trim());
                const hasTitulo = Boolean(sec.titulo?.trim());
                if (!hasImage && !hasText && !hasTitulo) return null;

                return (
                  <div
                    key={sec.id}
                    className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
                  >
                    <div className="w-full">
                      {hasImage ? (
                        <ImageZoom src={sec.imagem!.trim()} alt={sec.titulo?.trim() || "Seção"} />
                      ) : (
                        <span className="hidden lg:block" aria-hidden />
                      )}
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      {hasTitulo && (
                        <h2 className="text-3xl font-bold text-white lg:text-4xl">
                          {sec.titulo}
                        </h2>
                      )}
                      {hasText && (
                        <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-400">
                          {sec.texto}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-[#0A0C10] px-6 py-20">
            <div className="mx-auto max-w-7xl">
              <h2
                className="mb-4 text-center font-bold text-white"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
              >
                Veja o {produto.nome} em Funcionamento
              </h2>
              <p className="mb-12 text-center text-gray-400">
                Assista ao vídeo deste equipamento
              </p>

              <div className="mx-auto max-w-4xl">
                {videoEmbedUrl ? (
                  <div
                    className="overflow-hidden rounded-2xl border"
                    style={{
                      borderColor: "rgba(255,71,87,0.3)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div className="relative" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={videoEmbedUrl}
                        title={`Vídeo — ${produto.nome}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl border p-12 text-center"
                    style={{
                      background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
                      borderColor: "rgba(255, 71, 87, 0.3)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div
                      className="mb-6 inline-flex items-center justify-center rounded-full"
                      style={{
                        width: "100px",
                        height: "100px",
                        background: "linear-gradient(135deg, rgba(255, 71, 87, 0.2), rgba(255, 71, 87, 0.1))",
                        border: "2px solid rgba(255, 71, 87, 0.4)",
                      }}
                    >
                      <Play className="h-12 w-12 text-[#FF4757]" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-white">Vídeo não cadastrado</h3>
                    <p className="mb-6 max-w-xl text-base text-gray-400">
                      Quando houver um link do YouTube no cadastro do produto, o vídeo será exibido aqui.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden py-24" style={{ background: "#12141A" }}>
            <div className="relative z-10 mx-auto max-w-5xl px-4 text-center md:px-6 lg:px-8">
              <h2 className="mb-4 text-3xl font-extrabold text-gray-200 lg:text-4xl">
                {ctaTitulo}
              </h2>
              <p className="mb-8 text-lg text-gray-400">
                {ctaSubtitulo}
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 6px 20px rgba(37, 211, 102, 0.35)",
                  }}
                  onClick={() => window.open(ctaHref, "_blank")}
                >
                  <MessageCircle className="h-5 w-5" />
                  {ctaTexto}
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
          <p className="mb-4 text-lg text-gray-400">Este produto não foi encontrado.</p>
          <Link
            to={backPath}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white"
            style={{ background: "#FF4757" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </section>
      )}
    </div>
  );
};

export default EquipamentoDetalhe;
