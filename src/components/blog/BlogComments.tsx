import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

type Comment = {
  id: string;
  author: string;
  date: string;
  text: string;
};

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Maria Silva",
    date: "20 de fev. de 2025",
    text: "Muito útil! Estava em dúvida sobre qual PDV escolher e o artigo esclareceu bem os pontos principais.",
  },
  {
    id: "2",
    author: "João Santos",
    date: "18 de fev. de 2025",
    text: "Parabéns pelo conteúdo. Gostaria de saber se vocês fazem implantação em outras cidades.",
  },
];

const cardStyle = {
  background:
    "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
  borderColor: "rgba(255, 71, 87, 0.25)",
};

type BlogCommentsProps = {
  postSlug?: string;
  comments?: Comment[];
};

export default function BlogComments({
  comments = mockComments,
}: BlogCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitted(true);
    setNewComment("");
  };

  return (
    <section
      className="rounded-2xl border p-6"
      style={cardStyle}
    >
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-200">
        <MessageCircle className="h-5 w-5 text-[#FF4757]" />
        Comentários ({comments.length})
      </h3>

      <ul className="mb-8 space-y-6">
        {comments.map((c) => (
          <li key={c.id} className="border-l-2 border-[#FF4757]/30 pl-4">
            <p className="text-sm font-medium text-gray-300">{c.author}</p>
            <p className="mb-1 text-xs text-gray-500">{c.date}</p>
            <p className="text-sm text-gray-400">{c.text}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h4 className="mb-3 text-sm font-bold text-gray-300">
          Deixe seu comentário
        </h4>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva aqui..."
          rows={3}
          className="mb-3 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:border-[#FF4757] focus:outline-none focus:ring-1 focus:ring-[#FF4757]"
          disabled={submitted}
        />
        <button
          type="submit"
          disabled={submitted}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-opacity disabled:opacity-60"
          style={{ background: "#FF4757" }}
        >
          <Send className="h-4 w-4" />
          {submitted ? "Enviado!" : "Enviar comentário"}
        </button>
      </form>
    </section>
  );
}
