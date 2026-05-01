import { useState, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: loginError } = await login(email, password);
    setLoading(false);
    if (loginError) setError(loginError);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#090909] px-4">
      {/* Red ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, rgba(220,38,38,0.08) 0%, transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: "rgba(220,38,38,0.055)" }}
      />

      <div className="relative w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex items-center justify-center">
            <img
              src="/img/logorodape.webp"
              alt="Lógica Informática"
              className="h-12 w-auto"
              style={{
                filter: "drop-shadow(0 0 28px rgba(220,38,38,0.5))",
              }}
            />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Painel Administrativo
          </h1>
          <p className="mt-1.5 text-sm text-gray-600">Lógica Automação Comercial</p>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-gray-800/50 bg-gray-900/70 p-8 shadow-2xl shadow-black/60 backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(220,38,38,0.38) 40%, rgba(220,38,38,0.2) 70%, transparent 95%)",
            }}
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* E-mail */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                E-mail
              </label>
              <input
                type="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@exemplo.com"
                className="w-full rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-2.5 text-sm text-white placeholder-gray-700 outline-none transition focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-700 outline-none transition focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 transition hover:text-gray-400"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60 active:scale-[0.98]"
              style={{
                boxShadow: "0 4px 20px rgba(220,38,38,0.3), 0 1px 3px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 28px rgba(220,38,38,0.45), 0 1px 3px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 4px 20px rgba(220,38,38,0.3), 0 1px 3px rgba(0,0,0,0.4)";
              }}
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
