import { CalendarDays, Edit3, Trash2, Save, X } from "lucide-react";
import { ikonKategori } from "../../constants/index.js";
import { formatTanggal, formatRupiah } from "../../utils/formatters.js";
import { inputDasar, ErrorAlert } from "../ui/index.js";

export function DaftarPengeluaran({
  pengeluaranTerurut,
  kategoriMap,
  categories,
  expenseSort,
  onSortChange,
  editingId,
  editDraft,
  setEditDraft,
  onStartEdit,
  onSaveEdit,
  onDelete,
  onCancelEdit,
  error
}) {
  return (
    <section className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-5 shadow-2xl shadow-slate-950/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Daftar Pengeluaran</h2>
          <p className="mt-1 text-sm text-slate-400">
            Pengeluaran bulan terpilih dapat diurutkan sesuai kebutuhan.
          </p>
        </div>
        <label className="grid gap-1 text-sm font-medium text-slate-300">
          Urutkan
          <select
            value={expenseSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="min-h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none focus:border-emerald-400"
          >
            <option value="terbaru">Tanggal terbaru</option>
            <option value="terlama">Tanggal terlama</option>
            <option value="terbesar">Nominal terbesar</option>
            <option value="terkecil">Nominal terkecil</option>
            <option value="kategori">Kategori A-Z</option>
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-3">
        {pengeluaranTerurut.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/60 px-4 py-8 text-center text-sm text-slate-400">
            Belum ada pengeluaran pada bulan ini.
          </div>
        ) : (
          pengeluaranTerurut.map((transaksi) => {
            const infoKategori = kategoriMap.get(transaksi.categoryId) ?? categories[0];
            const IkonKategori = ikonKategori[infoKategori?.ikon] || ikonKategori.umum;
            const sedangEdit = editingId === transaksi.id && editDraft;

            return (
              <article
                key={transaksi.id}
                className="rounded-lg border border-slate-700 bg-slate-900/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-slate-600"
              >
                {sedangEdit ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      value={editDraft.text}
                      onChange={(e) => setEditDraft({ ...editDraft, text: e.target.value })}
                      className={inputDasar()}
                      type="text"
                    />
                    <input
                      value={editDraft.amount}
                      onChange={(e) => setEditDraft({ ...editDraft, amount: e.target.value })}
                      className={inputDasar()}
                      type="number"
                      min="1"
                      step="1"
                    />
                    <input
                      value={editDraft.date}
                      onChange={(e) => setEditDraft({ ...editDraft, date: e.target.value })}
                      className={inputDasar()}
                      type="date"
                    />
                    <select
                      value={editDraft.categoryId}
                      onChange={(e) => setEditDraft({ ...editDraft, categoryId: e.target.value })}
                      className={inputDasar()}
                    >
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 md:col-span-2">
                      <button
                        type="button"
                        onClick={() => onSaveEdit(transaksi.id)}
                        className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
                      >
                        <Save className="h-4 w-4" aria-hidden="true" />
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={onCancelEdit}
                        className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 font-semibold text-slate-300 transition hover:border-slate-600"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                    <span className={`grid h-11 w-11 place-items-center rounded-lg ring-1 ${infoKategori.kelas}`}>
                      <IkonKategori className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="break-words font-semibold text-white">
                          {transaksi.text}
                        </h3>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${infoKategori.kelas}`}>
                          {infoKategori.nama}
                        </span>
                      </div>
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        {formatTanggal.format(new Date(transaksi.date))}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <strong className="whitespace-nowrap text-base font-bold text-rose-300">
                        -{formatRupiah.format(Number(transaksi.amount))}
                      </strong>
                      <button
                        type="button"
                        onClick={() => onStartEdit(transaksi)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-200 transition hover:bg-blue-500/20"
                        aria-label={`Edit pengeluaran ${transaksi.text}`}
                      >
                        <Edit3 className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(transaksi.id)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-rose-400/20 bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/20"
                        aria-label={`Hapus pengeluaran ${transaksi.text}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
      <ErrorAlert message={error} />
    </section>
  );
}
