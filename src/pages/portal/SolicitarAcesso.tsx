import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Building2,
  Mail,
  Phone,
  User,
  FileText,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";

export default function SolicitarAcesso() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    cnpj: "",
    nomeEmpresa: "",
    cargo: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  // Formatar CNPJ
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

  // Formatar Telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    return value;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cnpj") {
      setFormData((prev) => ({ ...prev, [name]: formatCNPJ(value) }));
    } else if (name === "telefone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (error) setError("");
  };

  // Validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    const cnpjNumbers = formData.cnpj.replace(/\D/g, "");
    const phoneNumbers = formData.telefone.replace(/\D/g, "");

    if (formData.nomeCompleto.length < 3) {
      setError("Nome completo muito curto.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("E-mail inválido.");
      return;
    }

    if (phoneNumbers.length < 10) {
      setError("Telefone inválido. Digite com DDD.");
      return;
    }

    if (cnpjNumbers.length !== 14) {
      setError("CNPJ inválido. Digite os 14 dígitos.");
      return;
    }

    if (formData.nomeEmpresa.length < 3) {
      setError("Nome da empresa muito curto.");
      return;
    }

    setIsSubmitting(true);

    try {
      // SIMULAÇÃO DE ENVIO (substituir por API real)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);

      /*
      // SUBSTITUIR POR CHAMADA REAL DE API:
      const response = await fetch('/api/portal/solicitar-acesso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeCompleto: formData.nomeCompleto,
          email: formData.email,
          telefone: phoneNumbers,
          cnpj: cnpjNumbers,
          nomeEmpresa: formData.nomeEmpresa,
          cargo: formData.cargo,
          mensagem: formData.mensagem,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        setError('Erro ao enviar solicitação. Tente novamente.');
      }
      */
    } catch (err) {
      console.error("Erro ao solicitar acesso:", err);
      setError("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Página de Sucesso
  if (submitSuccess) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "#000000" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
          }}
        />

        <div className="relative z-10 w-full max-w-md px-4">
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              background:
                "linear-gradient(145deg, rgba(15, 17, 21, 0.9) 0%, rgba(12, 14, 17, 0.9) 100%)",
              borderColor: "rgba(34, 197, 94, 0.5)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="mb-6 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)",
                  boxShadow: "0 0 60px rgba(34, 197, 94, 0.3)",
                }}
              >
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </div>

            <h2 className="mb-4 text-2xl font-extrabold text-white">
              Solicitação Enviada!
            </h2>

            <p className="mb-6 text-gray-400">
              Recebemos sua solicitação de acesso ao Portal do Cliente. Nossa
              equipe irá analisar seus dados e entrar em contato em até 24 horas
              úteis.
            </p>

            <div
              className="mb-6 rounded-lg p-4"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
              }}
            >
              <p className="text-sm font-bold text-green-400">
                Próximos passos:
              </p>
              <ul className="mt-2 space-y-1 text-left text-xs text-gray-400">
                <li>✓ Verificação dos seus dados cadastrais</li>
                <li>✓ Criação da sua conta no sistema</li>
                <li>✓ Envio das credenciais por e-mail</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate("/portal/login")}
                className="w-full rounded-lg px-6 py-3 text-sm font-bold text-white"
                style={{ background: "#FF4757" }}
              >
                Ir para Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full rounded-lg border-2 px-6 py-3 text-sm font-bold"
                style={{
                  borderColor: "#FF4757",
                  color: "#FF4757",
                }}
              >
                Voltar ao Site
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Formulário de Solicitação
  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, #0A0C10 50%, #12141A 100%)",
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

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-20">
        <div>
          {/* Botão Voltar */}
          <button
            type="button"
            onClick={() => navigate("/portal/login")}
            className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#FF4757]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Login
          </button>

          {/* Cabeçalho */}
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
                <UserPlus className="h-10 w-10 text-[#FF4757]" />
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-extrabold text-white">
              Solicitar Acesso
            </h1>
            <p className="text-gray-400">
              Preencha o formulário abaixo e nossa equipe entrará em contato
            </p>
          </div>

          {/* Card do Formulário */}
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-200">
                  Dados Pessoais
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Nome Completo */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="nomeCompleto"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        id="nomeCompleto"
                        name="nomeCompleto"
                        required
                        value={formData.nomeCompleto}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "rgba(255, 71, 87, 0.3)",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.6)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.3)")
                        }
                      />
                    </div>
                  </div>

                  {/* E-mail */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "rgba(255, 71, 87, 0.3)",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.6)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.3)")
                        }
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div>
                    <label
                      htmlFor="telefone"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Telefone/WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        maxLength={15}
                        placeholder="(47) 99999-9999"
                        className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "rgba(255, 71, 87, 0.3)",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.6)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.3)")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dados da Empresa */}
              <div className="border-t border-gray-800 pt-6">
                <h3 className="mb-4 text-lg font-bold text-gray-200">
                  Dados da Empresa
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* CNPJ */}
                  <div>
                    <label
                      htmlFor="cnpj"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      CNPJ *
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
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.6)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.3)")
                        }
                      />
                    </div>
                  </div>

                  {/* Nome da Empresa */}
                  <div>
                    <label
                      htmlFor="nomeEmpresa"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      id="nomeEmpresa"
                      name="nomeEmpresa"
                      required
                      value={formData.nomeEmpresa}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa"
                      className="w-full rounded-lg border bg-transparent py-3 px-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "rgba(255, 71, 87, 0.3)",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor =
                          "rgba(255, 71, 87, 0.6)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          "rgba(255, 71, 87, 0.3)")
                      }
                    />
                  </div>

                  {/* Cargo */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="cargo"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Cargo/Função (opcional)
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        placeholder="Ex: Gerente, Proprietário, Analista"
                        className="w-full rounded-lg border bg-transparent py-3 pl-12 pr-4 text-gray-200 transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "rgba(255, 71, 87, 0.3)",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.6)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "rgba(255, 71, 87, 0.3)")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensagem */}
              <div className="border-t border-gray-800 pt-6">
                <label
                  htmlFor="mensagem"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Mensagem (opcional)
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Conte-nos um pouco sobre sua empresa ou necessidades específicas..."
                  className="w-full rounded-lg border bg-transparent px-4 py-3 text-gray-200 transition-all focus:outline-none focus:ring-2"
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

              {/* Botão de Enviar */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-all"
                style={{
                  background: isSubmitting ? "#999" : "#FF4757",
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 6px 20px rgba(255, 71, 87, 0.35)",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Enviando Solicitação...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar Solicitação
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                Ao enviar esta solicitação, você concorda que a Lógica entre em
                contato
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
