import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

const MOBILE_BREAKPOINT = 768;

export const FlipCard = ({
  front,
  back,
  className = "",
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [useTouchBehavior, setUseTouchBehavior] = useState(false);

  useEffect(() => {
    const check = () => {
      const touch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      const narrow = typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;
      setUseTouchBehavior(!!(touch || narrow));
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped((prev) => !prev);
      setIsAnimating(true);
    }
  };

  const handleMouseEnter = () => {
    if (!useTouchBehavior) {
      setIsFlipped(true);
      setIsAnimating(true);
    }
  };

  const handleMouseLeave = () => {
    if (!useTouchBehavior) {
      setIsFlipped(false);
      setIsAnimating(true);
    }
  };

  const handleClick = () => {
    if (useTouchBehavior) handleFlip();
  };

  return (
    <div
      className={`flip-card-container ${className}`}
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (useTouchBehavior && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleFlip();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="flip-card-inner w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={() => setIsAnimating(false)}
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        {/* FRENTE DO CARD */}
        <div
          className="flip-card-face flip-card-front absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(1px)",
          }}
        >
          {front}
        </div>

        {/* VERSO DO CARD - translateZ(1px) evita bug de backface no Safari/iOS */}
        <div
          className="flip-card-face flip-card-back absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};
