import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageZoom = ({ src, alt, className = "" }: ImageZoomProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

        {/* Badge Ampliar - sempre visível para mobile/touch */}
        <div
          className="absolute bottom-3 right-3 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
          style={{
            opacity: imageLoaded ? 1 : 0,
            background: "rgba(15, 17, 21, 0.9)",
            color: "#E5E7EB",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          🔍 Ampliar
        </div>
      </div>

      {/* Modal de Zoom */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(8px)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada da imagem"
          >
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full p-3 backdrop-blur-sm transition-all hover:rotate-90"
              style={{
                background: "rgba(255, 71, 87, 0.15)",
                color: "#E5E7EB",
                border: "1px solid rgba(255, 71, 87, 0.25)",
              }}
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Imagem Ampliada */}
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
              }}
            />

            {/* Nome do produto */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full px-6 py-3 backdrop-blur-sm"
              style={{
                background: "rgba(15, 17, 21, 0.9)",
                color: "#E5E7EB",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <p className="text-sm font-medium">{alt}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
