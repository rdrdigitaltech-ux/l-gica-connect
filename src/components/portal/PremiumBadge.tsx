import { Crown } from "lucide-react";

export default function PremiumBadge() {
  return (
    <span
      className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold"
      style={{
        background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
        color: "#1a1a1a",
      }}
    >
      <Crown className="h-3 w-3" />
      Premium
    </span>
  );
}
