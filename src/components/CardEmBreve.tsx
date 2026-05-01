export const CardEmBreve = ({ filtroAtivo }: { filtroAtivo: string }) => {
  const label = filtroAtivo === "todos" ? "Todos" : filtroAtivo;

  return (
    <div
      className="col-span-full overflow-hidden rounded-2xl border p-10 text-center md:p-12"
      style={{
        background:
          "linear-gradient(145deg, rgba(15,17,21,0.9) 0%, rgba(12,14,17,0.9) 100%)",
        borderColor: "rgba(255, 71, 87, 0.25)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="mb-6 inline-flex items-center justify-center rounded-full"
        style={{
          width: "88px",
          height: "88px",
          background: "rgba(255, 71, 87, 0.12)",
          border: "2px solid rgba(255, 71, 87, 0.3)",
        }}
      >
        <svg
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#FF4757"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>

      <h3
        className="mb-3 font-bold text-white"
        style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
      >
        Em breve
      </h3>

      <p className="max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
        Ainda não temos produtos cadastrados para{" "}
        <span className="font-semibold text-[#FF4757]">{label}</span>. Em breve
        você verá fotos e especificações completas aqui.
      </p>

      <div
        className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
        style={{
          background: "rgba(255, 71, 87, 0.15)",
          border: "1px solid rgba(255, 71, 87, 0.3)",
          color: "#FF4757",
        }}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        Em Produção
      </div>
    </div>
  );
};

