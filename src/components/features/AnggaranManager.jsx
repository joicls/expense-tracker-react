import { useState } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import { ikonKategori, warnaKategori } from "../../constants/index.js";
import { formatRupiah } from "../../utils/formatters.js";
import { getWarnaByIndex } from "../../utils/helpers.js";
import { PilihanWarna, inputDasar, ErrorAlert } from "../ui/index.js";

export function AnggaranManager({
  categories,
  penggunaanAnggaran,
  totalAnggaran,
  editingCategoryId,
  categoryDraft,
  setCategoryDraft,
  onStartEdit,
  onSaveEdit,
  onDelete,
  onCancelEdit,
  onAdd,
  error
}) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState(warnaKategori[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nama = newCategoryName.trim();
    const budget = Number(newCategoryBudget) || 0;

    if (!nama) {
      return;
    }

    const isDuplicate = categories.some(
      (kategori) => kategori.nama.toLowerCase() === nama.toLowerCase()
    );

    if (isDuplicate) {
      return;
    }

    const result = onAdd(nama, budget, newCategoryColor);
    if (result) {
      const index = categories.length;
      setNewCategoryName("");
      setNewCategoryBudget("");
      setNewCategoryColor(getWarnaByIndex(index + 1));
    }
  };

  return (
    <section className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-5 shadow-2xl shadow-slate-950/20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Kategori Anggaran</h2>
          <p className="mt-1 text-sm text-slate-400">
            Tambahkan kategori baru dan edit nama atau anggaran bulanan.
          </p>
        </div>
        <span className="text-sm text-slate-400">
          Total anggaran {formatRupiah.format(totalAnggaran)}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className={inputDasar()}
          placeholder="Kategori baru"
          type="text"
        />
        <input
          value={newCategoryBudget}
          onChange={(e) => setNewCategoryBudget(e.target.value)}
          className={inputDasar()}
          placeholder="Anggaran"
          type="number"
          min="0"
          step="1"
        />
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 font-semibold text-white transition hover:bg-blue-400"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Tambah
        </button>
        <div className="md:col-span-3">
          <PilihanWarna
            nilaiAktif={newCategoryColor}
            onPilih={setNewCategoryColor}
            label="Pilih warna kategori"
          />
        </div>
      </form>

      <div className="mt-5 grid gap-3">
        {penggunaanAnggaran.map((item) => {
          const Ikon = ikonKategori[item?.ikon] || ikonKategori.umum;
          const sedangEdit = editingCategoryId === item.id && categoryDraft;

          return (
            <article
              key={item.id}
              className="rounded-lg border border-slate-700 bg-slate-900/70 p-4"
            >
              {sedangEdit ? (
                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto_auto]">
                  <input
                    value={categoryDraft.nama}
                    onChange={(e) => setCategoryDraft({ ...categoryDraft, nama: e.target.value })}
                    className={inputDasar()}
                    type="text"
                  />
                  <input
                    value={categoryDraft.budget}
                    onChange={(e) => setCategoryDraft({ ...categoryDraft, budget: e.target.value })}
                    className={inputDasar()}
                    type="number"
                    min="0"
                    step="1"
                  />
                  <button
                    type="button"
                    onClick={() => onSaveEdit(item.id)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 font-semibold text-slate-300 transition hover:border-slate-600"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    Batal
                  </button>
                  <div className="md:col-span-4">
                    <PilihanWarna
                      nilaiAktif={categoryDraft.warna}
                      onPilih={(warna) => setCategoryDraft({ ...categoryDraft, warna })}
                      label={`Pilih warna ${item.nama}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
                  <span className={`grid h-11 w-11 place-items-center rounded-lg ring-1 ${item.kelas}`}>
                    <Ikon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">{item.nama}</h3>
                      <span className="rounded-full bg-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-300">
                        {item.persen}% terpakai
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className={`h-full rounded-full ${
                          item.persen >= 100 ? "bg-rose-400" : "bg-emerald-400"
                        }`}
                        style={{ width: `${item.persen}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      Terpakai {formatRupiah.format(item.terpakai)} dari {formatRupiah.format(item.budget)}. Sisa {formatRupiah.format(item.sisa)}.
                    </p>
                  </div>
                  <div className="flex gap-2 md:justify-end">
                    <button
                      type="button"
                      onClick={() => onStartEdit(item)}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-200 transition hover:bg-blue-500/20"
                      aria-label={`Edit kategori ${item.nama}`}
                    >
                      <Edit3 className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      disabled={item.bawaan}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-rose-400/20 bg-rose-500/10 text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Hapus kategori ${item.nama}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <ErrorAlert message={error} />
    </section>
  );
}
