import { bulanSaatIni } from "../../utils/helpers.js";

export function Header({ selectedMonth, onMonthChange }) {
  return (
    <header className="flex flex-col gap-4 rounded-lg border border-slate-700/80 bg-slate-950/60 p-5 shadow-2xl shadow-slate-950/40 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase text-emerald-300">
          Dasbor Keuangan
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Pencatat Pengeluaran
        </h1>
      </div>
      <label className="grid gap-1 text-sm font-medium text-slate-300">
        Bulan laporan
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value || bulanSaatIni())}
          className="min-h-11 rounded-lg border border-slate-700 bg-slate-800 px-3 text-white outline-none focus:border-emerald-400"
        />
      </label>
    </header>
  );
}
