interface FiltroEquipamentosProps {
  opcoes: readonly string[];
  filtroAtivo: string;
  onFiltroChange: (filtro: string) => void;
  titulo?: string;
}

export const FiltroEquipamentos = ({
  opcoes,
  filtroAtivo,
  onFiltroChange,
  titulo = "Filtrar por tipo",
}: FiltroEquipamentosProps) => {
  const baseBtn =
    "min-h-[44px] rounded-lg px-5 py-2.5 text-sm font-semibold transition-all md:text-base";

  const ativo =
    "bg-[#FF4757] text-white shadow-[0_10px_30px_rgba(255,71,87,0.25)]";
  const inativo =
    "bg-white/5 text-gray-200 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/15";

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-200">{titulo}:</h3>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onFiltroChange("todos")}
          className={`${baseBtn} ${filtroAtivo === "todos" ? ativo : inativo}`}
        >
          Todos
        </button>

        {opcoes.map((opcao) => (
          <button
            key={opcao}
            type="button"
            onClick={() => onFiltroChange(opcao)}
            className={`${baseBtn} ${filtroAtivo === opcao ? ativo : inativo}`}
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
};

