import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Building2,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
<<<<<<< HEAD
import { useSiteContent } from "@/hooks/useSiteContent";
=======
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
<<<<<<< HEAD
  const { content: pt } = useSiteContent("portal");
=======
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752

  const [formData, setFormData] = useState({
    cnpj: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Se já está autenticado, redireciona para dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/portal/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Formatar CNPJ enquanto digita
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 14) {
      return numbers
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return value;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cnpj") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatCNPJ(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Limpar erro ao digitar
    if (error) setError("");
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    const cnpjNumbers = formData.cnpj.replace(/\D/g, "");

    if (cnpjNumbers.length !== 14) {
      setError("CNPJ inválido. Digite os 14 dígitos.");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(cnpjNumbers, formData.password);

      if (success) {
        navigate("/portal/dashboard");
      } else {
        setError(
          "CNPJ ou senha incorretos. Verifique seus dados e tente novamente."
        );
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex w-full flex-col items-center py-10"
      style={{ background: "#06080A" }}
    >
      {/* Background com gradiente */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #06080A 0%, #0A0C10 50%, #06080A 100%)",
        }}
      />

      {/* Flashes de luz */}
      <div
        className="pointer-events-none absolute -left-[20%] top-[20%] z-0"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.15) 0%, rgba(255, 71, 87, 0.05) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-[15%] bottom-[15%] z-0"
        style={{
          width: 550,
          height: 550,
          background:
            "radial-gradient(circle, rgba(255, 71, 87, 0.12) 0%, rgba(255, 71, 87, 0.04) 50%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* Container Principal */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div>
          {/* Logo / Título */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 71, 87, 0.2) 0%, rgba(255, 71, 87, 0.1) 100%)",
                  boxShadow: "0 0 60px rgba(255, 71, 87, 0.3)",
                }}
              >
                <Lock className="h-10 w-10 text-[#FF4757]" />
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-extrabold text-white">
<<<<<<< HEAD
              {pt.login_titulo ?? "Portal do Cliente"}
            </h1>
            <p className="text-gray-400">{pt.login_subtitulo ?? "Acesse sua área exclusiva"}</p>
=======
              Portal do Cliente
            </h1>
            <p className="text-gray-400">Acesse sua área restrita</p>
>>>>>>> bb0eef4899aa3e3e6fbc87389bad56699407c752
          </div>

          {/* Card de Login */}
          <div
            className="rounded-2xl border p-8"
            style={{
              background:
                "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
              borderColor: "rgba(255, 71, 87, 0.25)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Mensagem de Erro */}
            {error && (
              <div
                className="mb-6 flex items-start gap-3 rounded-lg p-4"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo CNPJ */}
              <div>
                <label
                  htmlFor="cnpj"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  CNPJ da Empresa *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    required
                    value={formData.cnpj}
                    onChange={handleChange}
                    maxLength={18}
                    placeholder="00.000.000/0000-00"
                    className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "rgba(255, 71, 87, 0.3)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(255, 71, 87, 0.6)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255, 71, 87, 0.3)")
                    }
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Digite apenas os números
                </p>
              </div>

              {/* Campo Senha */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-12 text-gray-200 transition-all focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "rgba(255, 71, 87, 0.3)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(255, 71, 87, 0.6)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255, 71, 87, 0.3)")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Link "Esqueci minha senha" */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-gray-400 transition-colors hover:text-[#FF4757]"
                  onClick={() =>
                    alert(
                      "Funcionalidade em desenvolvimento. Entre em contato conosco."
                    )
                  }
                >
                  Esqueci minha senha
                </button>
              </div>

              {/* Botão de Login */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-all"
                style={{
                  background: isLoading ? "#999" : "#FF4757",
                  boxShadow: isLoading
                    ? "none"
                    : "0 6px 20px rgba(255, 71, 87, 0.35)",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Entrar no Portal
                  </>
                )}
              </button>
            </form>

            {/* Divisor */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-700" />
              <span className="text-xs text-gray-500">OU</span>
              <div className="h-px flex-1 bg-gray-700" />
            </div>

            {/* Solicitar Acesso */}
            <button
              type="button"
              onClick={() => navigate("/portal/solicitar-acesso")}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 px-8 py-4 text-base font-bold transition-all"
              style={{
                borderColor: "#FF4757",
                color: "#FF4757",
                background: "transparent",
              }}
            >
              <UserPlus className="h-5 w-5" />
              Solicitar Acesso
            </button>
          </div>

          {/* Voltar ao Site */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm text-gray-400 transition-colors hover:text-[#FF4757]"
            >
              ← Voltar ao site principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
