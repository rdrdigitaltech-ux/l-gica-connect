import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { memo } from "react";
import type { BlogPost } from "@/data/blogPosts";
import { formatPostDate, getCategoryByName } from "@/data/blogPosts";

const cardStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 71, 87, 0.1)",
};

type BlogCardProps = {
  post: BlogPost;
  variants?: { hidden: object; visible: object };
};
function BlogCardInner({ post }: BlogCardProps) {
  const category = getCategoryByName(post.category);

  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <article
        className="group relative overflow-hidden rounded-2xl border transition-all duration-300"
        style={cardStyle}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 71, 87, 0.6), transparent)",
          }}
        />
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          {category && (
            <span
              className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold"
              style={{
                background: "rgba(255, 71, 87, 0.9)",
                color: "#fff",
              }}
            >
              {category.name}
            </span>
          )}
        </div>
        <div className="p-6">
          <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-200 transition-colors group-hover:text-[#FF4757]">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-sm text-gray-400">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatPostDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min de leitura
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default memo(BlogCardInner);
