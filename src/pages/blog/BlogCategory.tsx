import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, FolderOpen } from "lucide-react";
import { useMemo } from "react";
import {
  getPostsByCategory,
  getCategoryBySlug,
} from "@/data/blogPosts";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";

export default function BlogCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const posts = useMemo(() => {
    const list = categorySlug ? getPostsByCategory(categorySlug) : [];
    return [...list].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [categorySlug]);

  if (!categorySlug || !category)
    return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen" style={{ background: "#0A0C10" }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] z-0"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-[#FF4757]">
              Início
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/blog" className="transition-colors hover:text-[#FF4757]">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">{category.name}</span>
          </nav>
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
            style={{
              background: "rgba(255, 71, 87, 0.1)",
              borderColor: "rgba(255, 71, 87, 0.3)",
            }}
          >
            <FolderOpen className="h-4 w-4 text-[#FF4757]" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Categoria
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold text-gray-200 lg:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            {posts.length} post{posts.length !== 1 ? "s" : ""} nesta categoria
          </p>
        </div>
      </section>

      {/* Listagem + Sidebar */}
      <section
        className="relative overflow-hidden py-16"
        style={{ background: "#12141A" }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <p
                  className="rounded-2xl border p-8 text-center text-gray-400"
                  style={{
                    borderColor: "rgba(255, 71, 87, 0.25)",
                    background:
                      "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  }}
                >
                  Nenhum post nesta categoria ainda.{" "}
                  <Link to="/blog" className="text-[#FF4757] hover:underline">
                    Ver todos os posts
                  </Link>
                  .
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
