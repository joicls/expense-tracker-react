export function KartuNavigasi({ aktif, judul, nilai, keterangan, Ikon, warna, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-5 text-left shadow-2xl shadow-slate-950/20 transition duration-300 hover:-translate-y-0.5 ${
        aktif
          ? "border-emerald-400/70 bg-slate-800 ring-4 ring-emerald-400/10"
          : "border-slate-700/80 bg-slate-800/70 hover:border-slate-600"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{judul}</p>
          <strong className="mt-3 block break-words text-2xl font-bold text-white">
            {nilai}
          </strong>
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${warna}`}>
          <Ikon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-400">{keterangan}</p>
    </button>
  );
}
