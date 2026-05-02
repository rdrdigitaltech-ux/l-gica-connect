import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  User,
  Tag as TagIcon,
  MessageSquare,
} from "lucide-react";
import {
  getPostBySlug,
  getRecentPosts,
  type BlogPost as BlogPostType,
} from "@/data/blogPosts";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  postSlug: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (slug) {
      const foundPost = getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        navigate("/blog");
      }
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (post) {
      const storedComments = localStorage.getItem(`comments_${post.slug}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "#000000" }}
      >
        <p className="text-gray-400">Carregando...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.author || !newComment.email || !newComment.content) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      email: newComment.email,
      content: newComment.content,
      date: new Date().toISOString(),
      postSlug: post!.slug,
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);

    localStorage.setItem(`comments_${post!.slug}`, JSON.stringify(updatedComments));

    setNewComment({ author: '', email: '', content: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      {/* ========== BREADCRUMB / VOLTAR ========== */}
      <section
        className="relative overflow-hidden py-8"
        style={{ background: "#0A0C10" }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#FF4757]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Blog
          </button>
        </div>
      </section>

      {/* ========== HERO / IMAGEM DE CAPA ========== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#12141A" }}
      >
        <div className="relative aspect-[21/9] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            width={840}
            height={360}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #12141A 0%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="-mt-32 pb-12">
            <div className="mb-6">
              <span
                className="inline-block rounded-full px-4 py-2 text-sm font-bold"
                style={{
                  background: "rgba(255, 71, 87, 0.9)",
                  color: "#ffffff",
                }}
              >
                {post.category}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime} min de leitura</span>
              </div>
              {post.views !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>{post.views} visualizações</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTEÚDO PRINCIPAL ========== */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "#12141A" }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* ========== CONTEÚDO DO POST ========== */}
            <article className="lg:col-span-9">
              <div
                className="prose prose-invert max-w-none"
                style={
                  {
                    "--tw-prose-body": "#d1d5db",
                    "--tw-prose-headings": "#f3f4f6",
                    "--tw-prose-links": "#FF4757",
                    "--tw-prose-bold": "#f3f4f6",
                    "--tw-prose-quotes": "#d1d5db",
                  } as React.CSSProperties
                }
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content, {
                    ALLOWED_TAGS: [
                      "p","br","strong","b","em","i","u","s","ul","ol","li",
                      "h2","h3","h4","h5","h6","blockquote","pre","code",
                      "a","img","figure","figcaption","table","thead","tbody",
                      "tr","th","td","hr","span","div",
                    ],
                    ALLOWED_ATTR: ["href","src","alt","title","class","target","rel"],
                    ALLOW_DATA_ATTR: false,
                  }),
                }}
              />

              <div className="mt-12 border-t border-gray-800 pt-8">
                <div className="flex items-center gap-3 text-sm">
                  <TagIcon className="h-5 w-5 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-all hover:scale-105"
                        style={{
                          background: "rgba(255, 71, 87, 0.1)",
                          color: "#FF4757",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="mt-8 rounded-2xl border p-6"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                  borderColor: "rgba(255, 71, 87, 0.25)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(255, 71, 87, 0.15)",
                    }}
                  >
                    <User className="h-8 w-8 text-[#FF4757]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-200">
                      {post.author.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Especialistas em Automação Comercial
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="mt-12 rounded-2xl border p-8"
                style={{
                  background: 'linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)',
                  borderColor: 'rgba(255, 71, 87, 0.25)',
                }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-[#FF4757]" />
                  <h3 className="text-xl font-bold text-gray-200">
                    Comentários ({comments.length})
                  </h3>
                </div>

                {/* Lista de Comentários */}
                <div className="mb-8 space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-lg border p-4"
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderColor: 'rgba(255, 71, 87, 0.15)',
                        }}
                      >
                        <div className="mb-2 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4757]">
                            <span className="text-sm font-bold text-white">
                              {comment.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-200">{comment.author}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(comment.date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="py-8 text-center text-gray-400">
                      Seja o primeiro a comentar!
                    </p>
                  )}
                </div>

                {/* Formulário de Novo Comentário */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="mb-4 font-bold text-gray-200">Deixe seu comentário</h4>

                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="author" className="mb-2 block text-sm text-gray-400">
                          Nome *
                        </label>
                        <input
                          type="text"
                          id="author"
                          required
                          value={newComment.author}
                          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                          className="w-full rounded-lg border bg-transparent px-4 py-3 text-gray-200 transition-all focus:outline-none focus:ring-2"
                          style={{ borderColor: 'rgba(255, 71, 87, 0.3)' }}
                          placeholder="Seu nome"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm text-gray-400">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={newComment.email}
                          onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                          className="w-full rounded-lg border bg-transparent px-4 py-3 text-gray-200 transition-all focus:outline-none focus:ring-2"
                          style={{ borderColor: 'rgba(255, 71, 87, 0.3)' }}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="content" className="mb-2 block text-sm text-gray-400">
                        Comentário *
                      </label>
                      <textarea
                        id="content"
                        required
                        rows={4}
                        value={newComment.content}
                        onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                        className="w-full rounded-lg border bg-transparent px-4 py-3 text-gray-200 transition-all focus:outline-none focus:ring-2"
                        style={{ borderColor: 'rgba(255, 71, 87, 0.3)' }}
                        placeholder="Escreva seu comentário..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg px-6 py-3 font-bold text-white"
                        style={{
                          background: isSubmitting ? '#999' : '#FF4757',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {isSubmitting ? 'Enviando...' : 'Publicar Comentário'}
                      </button>
                    </div>
                  </form>

                  <p className="mt-4 text-xs text-gray-500">
                    Seu e-mail não será publicado. Os comentários são moderados.
                  </p>
                </div>
              </div>
            </article>

            {/* ========== SIDEBAR (Compartilhamento + Posts Recentes) ========== */}
            <aside className="lg:col-span-3">
              <div className="sticky top-8 space-y-4">
                <div
                  className="rounded-2xl border p-6"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                    borderColor: "rgba(255, 71, 87, 0.25)",
                  }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-[#FF4757]" />
                    <h3 className="font-bold text-gray-200">Compartilhar</h3>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={shareOnFacebook}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/5"
                    >
                      <Facebook
                        className="h-5 w-5"
                        style={{ color: "#1877F2" }}
                      />
                      Facebook
                    </button>

                    <button
                      type="button"
                      onClick={shareOnTwitter}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/5"
                    >
                      <Twitter
                        className="h-5 w-5"
                        style={{ color: "#1DA1F2" }}
                      />
                      Twitter
                    </button>

                    <button
                      type="button"
                      onClick={shareOnLinkedIn}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/5"
                    >
                      <Linkedin
                        className="h-5 w-5"
                        style={{ color: "#0A66C2" }}
                      />
                      LinkedIn
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={copyLink}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-white/5"
                      >
                        <LinkIcon className="h-5 w-5 text-[#FF4757]" />
                        Copiar Link
                      </button>

                      {showCopyNotification && (
                        <div
                          className="absolute -top-12 left-1/2 w-max -translate-x-1/2 rounded-lg px-4 py-2 text-xs font-bold text-white"
                          style={{ background: "#22C55E" }}
                        >
                          Link copiado!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl border p-6"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
                    borderColor: "rgba(255, 71, 87, 0.25)",
                  }}
                >
                  <h3 className="mb-4 font-bold text-gray-200">
                    Posts Recentes
                  </h3>
                  <div className="space-y-4">
                    {getRecentPosts(4)
                      .filter((p) => p.id !== post.id)
                      .slice(0, 3)
                      .map((recentPost) => (
                        <Link
                          key={recentPost.id}
                          to={`/blog/${recentPost.slug}`}
                          className="group block transition-all hover:translate-x-1"
                        >
                          <h4 className="mb-1 text-sm font-medium text-gray-300 transition-colors group-hover:text-[#FF4757]">
                            {recentPost.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {formatDate(recentPost.publishedAt)}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
