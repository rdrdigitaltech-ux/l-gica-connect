import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageZoomProps {
  src: string;
  alt: string;
  /** Se fornecido com mais de 1 item, habilita carrossel no modal */
  images?: string[];
  className?: string;
}

export const ImageZoom = ({ src, alt, images, className = "" }: ImageZoomProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = images && images.length > 0 ? images : [src];
  const hasMultiple = allImages.length > 1;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const idx = allImages.indexOf(src);
      setCurrentIndex(idx >= 0 ? idx : 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasMultiple) prev();
      if (e.key === "ArrowRight" && hasMultiple) next();
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, hasMultiple, prev, next]);

  return (
    <>
      {/* Container da Imagem */}
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative h-[280px] w-full cursor-zoom-in overflow-hidden rounded-xl transition-transform hover:scale-[1.02] md:h-[400px] ${className}`}
        style={{
          background: "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
        }}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(30,32,36,0.3) 0%, rgba(40,42,46,0.5) 50%, rgba(30,32,36,0.3) 100%)",
              backgroundSize: "200% 100%",
              animation: "image-zoom-shimmer 1.5s infinite",
            }}
          />
        )}

        {/* Imagem */}
        <img
          src={src}
          alt={alt}
          width={500}
          height={400}
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 h-full w-full object-contain p-4 transition-all duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
          }}
          loading="lazy"
          decoding="async"
        />

        {/* Badge Ampliar */}
        <div
          className="absolute bottom-3 right-3 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
          style={{
            opacity: imageLoaded ? 1 : 0,
            background: "rgba(15, 17, 21, 0.9)",
            color: "#E5E7EB",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          🔍 Ampliar{hasMultiple ? ` (${allImages.length} fotos)` : ""}
        </div>
      </div>

      {/* Modal de Zoom / Carrossel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0, 0, 0, 0.92)",
              backdropFilter: "blur(8px)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada da imagem"
          >
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute right-4 top-4 z-20 rounded-full p-3 backdrop-blur-sm transition-all hover:rotate-90"
              style={{
                background: "rgba(255, 71, 87, 0.15)",
                color: "#E5E7EB",
                border: "1px solid rgba(255, 71, 87, 0.25)",
              }}
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Arrow Prev */}
            {hasMultiple && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110"
                style={{
                  background: "rgba(15, 17, 21, 0.85)",
                  color: "#E5E7EB",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Arrow Next */}
            {hasMultiple && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110"
                style={{
                  background: "rgba(15, 17, 21, 0.85)",
                  color: "#E5E7EB",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Imagem ampliada */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                src={allImages[currentIndex]}
                alt={`${alt}${hasMultiple ? ` — ${currentIndex + 1}/${allImages.length}` : ""}`}
                className="max-h-[82vh] max-w-[80vw] rounded-lg object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)" }}
              />
            </AnimatePresence>

            {/* Dots indicator */}
            {hasMultiple && (
              <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === currentIndex ? "24px" : "8px",
                      background: i === currentIndex ? "#FF4757" : "rgba(255,255,255,0.3)",
                    }}
                    aria-label={`Ir para imagem ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Nome do produto */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-6 py-3 backdrop-blur-sm"
              style={{
                background: "rgba(15, 17, 21, 0.9)",
                color: "#E5E7EB",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <p className="text-sm font-medium">
                {alt}{hasMultiple ? ` — ${currentIndex + 1} / ${allImages.length}` : ""}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
