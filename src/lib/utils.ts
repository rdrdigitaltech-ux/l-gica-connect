import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converte uma URL do YouTube (watch, curta ou embed) para uma URL de embed.
 * Retorna null se a URL não for reconhecida como YouTube.
 */
export function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  if (url.includes("youtube.com/embed/")) return url;
  return null;
}
