import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

type ShareButtonsProps = {
  url: string;
  title: string;
  description?: string;
};

const cardStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
};

export default function ShareButtons({
  url,
  title,
  description = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className="rounded-2xl border p-4"
      style={cardStyle}
    >
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
        Compartilhar
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        {shareLinks.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
            style={{ color: "#FF4757" }}
            aria-label={`Compartilhar no ${name}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
          style={{ color: copied ? "#22c55e" : "#FF4757" }}
          aria-label="Copiar link"
        >
          {copied ? (
            <Check className="h-5 w-5" />
          ) : (
            <Link2 className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
