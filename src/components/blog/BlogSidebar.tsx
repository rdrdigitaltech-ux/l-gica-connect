import { Link, useSearchParams } from "react-router-dom";
import { Search, FolderOpen } from "lucide-react";
import { useState } from "react";
import { blogCategories } from "@/data/blogPosts";

const cardStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
};

type BlogSidebarProps = {
  onSearch?: (query: string) => void;
};

export default function BlogSidebar({ onSearch }: BlogSidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (q) {
      setSearchParams({ q });
      onSearch?.(q);
    } else {
      setSearchParams({});
      onSearch?.("");
    }
  };

  return (
    <aside className="space-y-6">
      <div
        className="rounded-2xl border p-4"
        style={cardStyle}
      >
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
          Buscar
        </h3>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Digite aqui..."
              className="w-full rounded-lg border border-gray-700 bg-gray-900/50 py-2 pl-9 pr-3 text-sm text-gray-200 placeholder-gray-500 focus:border-[#FF4757] focus:outline-none focus:ring-1 focus:ring-[#FF4757]"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ background: "#FF4757" }}
          >
            Ir
          </button>
        </form>
      </div>

      <div
        className="rounded-2xl border p-4"
        style={cardStyle}
      >
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
          Categorias
        </h3>
        <ul className="space-y-1">
          {blogCategories.map((cat) => (
            <li key={cat.slug}>
              <Link
                to={`/blog/categoria/${cat.slug}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-[#FF4757]"
              >
                <FolderOpen className="h-4 w-4 shrink-0 opacity-70" />
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
