import { useState } from "react";
import { Plus } from "lucide-react";
import { InputField, ErrorAlert } from "../ui/index.js";
import { tanggalHariIni } from "../../utils/helpers.js";

export function FormTransaksi({ categories, onSubmit, onError, defaultCategoryId }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const [date, setDate] = useState(tanggalHariIni());
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = onSubmit({
      text,
      amount,
      categoryId,
      date,
      type: "pengeluaran"
    });

    if (!result.success) {
      setError(result.errors?.[0] || "Terjadi kesalahan");
      if (onError) onError(result.errors);
      return;
    }

    setText("");
    setAmount("");
    setCategoryId(defaultCategoryId);
    setDate(tanggalHariIni());
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-5 shadow-2xl shadow-slate-950/20"
    >
      <div>
        <h2 className="text-xl font-semibold text-white">Tambah Transaksi</h2>
        <p className="mt-1 text-sm text-slate-400">
          Masukkan pengeluaran dengan nominal positif.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <InputField
          label="Deskripsi"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Contoh: Makan siang"
        />

        <InputField
          label="Nominal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="50000"
          min="1"
          step="1"
        />

        <InputField
          label="Tanggal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />

        <InputField label="Kategori">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="min-h-12 rounded-lg border border-slate-700 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
          >
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </InputField>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ErrorAlert message={error} />
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Tambah Transaksi
        </button>
      </div>
    </form>
  );
}
