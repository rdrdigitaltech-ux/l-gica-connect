export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Card Flip Effect - APENAS para Home
 * Desktop: Hover eleva card + aumenta sombra
 * Mobile: Tap eleva card + aumenta sombra
 */
export const getHomeCardFlip = () => {
  const isTouch = isTouchDevice();

  return {
    // Desktop: hover
    whileHover: !isTouch
      ? {
          y: -8,
          boxShadow: '0 20px 40px rgba(255, 71, 87, 0.4)',
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        }
      : {},

    // Mobile: tap (mesmo efeito que hover)
    whileTap: {
      y: -8,
      boxShadow: '0 20px 40px rgba(255, 71, 87, 0.4)',
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };
};
