import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownCircle,
  CalendarDays,
  Car,
  CircleDollarSign,
  Clapperboard,
  CreditCard,
  Edit3,
  PieChart as PieChartIcon,
  Plus,
  ReceiptText,
  Save,
  Tags,
  Target,
  Trash2,
  Utensils,
  X
} from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const TRANSACTION_STORAGE_KEY = "pencatat-pengeluaran-transaksi";
const CATEGORY_STORAGE_KEY = "pencatat-pengeluaran-kategori";

const warnaKategori = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#64748b",
  "#f87171",
  "#fb923c",
  "#fbbf24",
  "#fde047",
  "#a3e635",
  "#4ade80",
  "#34d399",
  "#2dd4bf",
  "#22d3ee",
  "#38bdf8",
  "#60a5fa",
  "#818cf8",
  "#a78bfa",
  "#c084fc",
  "#e879f9",
  "#f472b6",
  "#fb7185",
  "#94a3b8"
];

const kelasKategori = [
  "bg-red-500/15 text-red-200 ring-red-400/30",
  "bg-orange-500/15 text-orange-200 ring-orange-400/30",
  "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  "bg-yellow-500/15 text-yellow-200 ring-yellow-400/30",
  "bg-lime-500/15 text-lime-200 ring-lime-400/30",
  "bg-green-500/15 text-green-200 ring-green-400/30",
  "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30",
  "bg-teal-500/15 text-teal-200 ring-teal-400/30",
  "bg-cyan-500/15 text-cyan-200 ring-cyan-400/30",
  "bg-sky-500/15 text-sky-200 ring-sky-400/30",
  "bg-blue-500/15 text-blue-200 ring-blue-400/30",
  "bg-indigo-500/15 text-indigo-200 ring-indigo-400/30",
  "bg-violet-500/15 text-violet-200 ring-violet-400/30",
  "bg-purple-500/15 text-purple-200 ring-purple-400/30",
  "bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-400/30",
  "bg-pink-500/15 text-pink-200 ring-pink-400/30",
  "bg-rose-500/15 text-rose-200 ring-rose-400/30",
  "bg-slate-500/20 text-slate-200 ring-slate-400/30",
  "bg-red-400/15 text-red-100 ring-red-300/30",
  "bg-orange-400/15 text-orange-100 ring-orange-300/30",
  "bg-amber-400/15 text-amber-100 ring-amber-300/30",
  "bg-yellow-300/15 text-yellow-100 ring-yellow-200/30",
  "bg-lime-400/15 text-lime-100 ring-lime-300/30",
  "bg-green-400/15 text-green-100 ring-green-300/30",
  "bg-emerald-400/15 text-emerald-100 ring-emerald-300/30",
  "bg-teal-400/15 text-teal-100 ring-teal-300/30",
  "bg-cyan-400/15 text-cyan-100 ring-cyan-300/30",
  "bg-sky-400/15 text-sky-100 ring-sky-300/30",
  "bg-blue-400/15 text-blue-100 ring-blue-300/30",
  "bg-indigo-400/15 text-indigo-100 ring-indigo-300/30",
  "bg-violet-400/15 text-violet-100 ring-violet-300/30",
  "bg-purple-400/15 text-purple-100 ring-purple-300/30",
  "bg-fuchsia-400/15 text-fuchsia-100 ring-fuchsia-300/30",
  "bg-pink-400/15 text-pink-100 ring-pink-300/30",
  "bg-rose-400/15 text-rose-100 ring-rose-300/30",
  "bg-slate-400/20 text-slate-100 ring-slate-300/30"
];

const pilihanWarnaKategori = warnaKategori.map((warna, index) => ({
  warna,
  kelas: kelasKategori[index],
  nama: [
    "Merah",
    "Oranye",
    "Amber",
    "Kuning",
    "Lime",
    "Hijau",
    "Emerald",
    "Teal",
    "Cyan",
    "Langit",
    "Biru",
    "Indigo",
    "Violet",
    "Ungu",
    "Fuchsia",
    "Pink",
    "Rose",
    "Slate",
    "Merah Muda",
    "Oranye Muda",
    "Amber Muda",
    "Kuning Muda",
    "Lime Muda",
    "Hijau Muda",
    "Emerald Muda",
    "Teal Muda",
    "Cyan Muda",
    "Langit Muda",
    "Biru Muda",
    "Indigo Muda",
    "Violet Muda",
    "Ungu Muda",
    "Fuchsia Muda",
    "Pink Muda",
    "Rose Muda",
    "Slate Muda"
  ][index]
}));

const kategoriAwal = [
  { id: "makanan", nama: "Makanan", budget: 1500000, warna: warnaKategori[0], kelas: kelasKategori[0], ikon: "makanan", bawaan: true },
  { id: "transportasi", nama: "Transportasi", budget: 600000, warna: warnaKategori[1], kelas: kelasKategori[1], ikon: "transportasi", bawaan: true },
  { id: "tagihan", nama: "Tagihan", budget: 1200000, warna: warnaKategori[2], kelas: kelasKategori[2], ikon: "tagihan", bawaan: true },
  { id: "hiburan", nama: "Hiburan", budget: 500000, warna: warnaKategori[3], kelas: kelasKategori[3], ikon: "hiburan", bawaan: true },
  { id: "investasi", nama: "Investasi", budget: 2000000, warna: warnaKategori[4], kelas: kelasKategori[4], ikon: "investasi", bawaan: true }
];

const ikonKategori = {
  makanan: Utensils,
  transportasi: Car,
  tagihan: ReceiptText,
  hiburan: Clapperboard,
  investasi: CircleDollarSign,
  umum: Tags
};

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const formatTanggal = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

const formatBulan = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  year: "numeric"
});

function tanggalHariIni() {
  return new Date().toISOString().slice(0, 10);
}

function bulanSaatIni() {
  return new Date().toISOString().slice(0, 7);
}

function buatIdKategori(nama) {
  return (
    nama
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || crypto.randomUUID()
  );
}

function ambilIkon(kategori) {
  return ikonKategori[kategori?.ikon] ?? Tags;
}

function ambilKelasWarna(warna) {
  return (
    pilihanWarnaKategori.find((pilihan) => pilihan.warna === warna)?.kelas ??
    kelasKategori[0]
  );
}

function muatKategori() {
  try {
    const dataTersimpan = localStorage.getItem(CATEGORY_STORAGE_KEY);
    const dataTerurai = dataTersimpan ? JSON.parse(dataTersimpan) : null;

    if (!Array.isArray(dataTerurai) || dataTerurai.length === 0) {
      return kategoriAwal;
    }

    return dataTerurai.map((kategori, index) => ({
      id: kategori.id || buatIdKategori(kategori.nama || `kategori-${index}`),
      nama: kategori.nama || "Kategori",
      budget: Math.max(0, Number(kategori.budget) || 0),
      warna: kategori.warna || warnaKategori[index % warnaKategori.length],
      kelas: ambilKelasWarna(kategori.warna) || kategori.kelas || kelasKategori[index % kelasKategori.length],
      ikon: kategori.ikon || "umum",
      bawaan: Boolean(kategori.bawaan)
    }));
  } catch {
    return kategoriAwal;
  }
}

function muatTransaksi(kategori) {
  try {
    const dataTersimpan = localStorage.getItem(TRANSACTION_STORAGE_KEY);
    const dataTerurai = dataTersimpan ? JSON.parse(dataTersimpan) : [];
    const kategoriFallback = kategori[0]?.id ?? "makanan";

    return Array.isArray(dataTerurai)
      ? dataTerurai
          .filter(
            (transaksi) =>
              transaksi &&
              typeof transaksi.text === "string" &&
              Number.isFinite(Number(transaksi.amount))
          )
          .map((transaksi) => {
            const nominalAsli = Number(transaksi.amount);
            const jenis =
              transaksi.type || (nominalAsli < 0 ? "pengeluaran" : "pemasukan");
            const kategoriDitemukan =
              kategori.find(
                (item) =>
                  item.id === transaksi.categoryId ||
                  item.nama === transaksi.category
              )?.id ?? kategoriFallback;

            return {
              id: transaksi.id || crypto.randomUUID(),
              text: transaksi.text,
              amount: Math.abs(nominalAsli),
              type: jenis === "pengeluaran" ? "pengeluaran" : "pemasukan",
              categoryId: kategoriDitemukan,
              date: transaksi.date || new Date().toISOString()
            };
          })
      : [];
  } catch {
    return [];
  }
}

function inputDasar(kelasTambahan = "") {
  return `min-h-12 rounded-lg border border-slate-700 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 ${kelasTambahan}`;
}

function TooltipGrafik({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm shadow-xl">
      <p className="font-semibold text-white">{data.name}</p>
      <p className="text-slate-300">{formatRupiah.format(data.value)}</p>
    </div>
  );
}

function KartuNavigasi({ aktif, judul, nilai, keterangan, Ikon, warna, onClick }) {
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

function PilihanWarna({ nilaiAktif, onPilih, label }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950 p-3">
      <p className="mb-3 text-sm font-medium text-slate-300">{label}</p>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-9 md:grid-cols-12">
        {pilihanWarnaKategori.map((pilihan) => (
          <button
            key={pilihan.warna}
            type="button"
            onClick={() => onPilih(pilihan.warna)}
            className={`h-9 rounded-lg border transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/10 ${
              nilaiAktif === pilihan.warna
                ? "border-white ring-2 ring-white/70"
                : "border-slate-700"
            }`}
            style={{ backgroundColor: pilihan.warna }}
            aria-label={`Pilih warna ${pilihan.nama}`}
            title={pilihan.nama}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [categories, setCategories] = useState(() => muatKategori());
  const [transactions, setTransactions] = useState(() => muatTransaksi(muatKategori()));
  const [activeView, setActiveView] = useState("ringkasan");
  const [selectedMonth, setSelectedMonth] = useState(() => bulanSaatIni());
  const [expenseSort, setExpenseSort] = useState("terbaru");
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(() => kategoriAwal[0].id);
  const [date, setDate] = useState(() => tanggalHariIni());
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState(warnaKategori[0]);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryDraft, setCategoryDraft] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const kategoriMap = useMemo(
    () => new Map(categories.map((kategori) => [kategori.id, kategori])),
    [categories]
  );

  const transaksiBulanan = useMemo(
    () =>
      transactions.filter((transaksi) =>
        new Date(transaksi.date).toISOString().startsWith(selectedMonth)
      ),
    [selectedMonth, transactions]
  );

  const ringkasanBulanan = useMemo(() => {
    const income = transaksiBulanan
      .filter((transaksi) => transaksi.type === "pemasukan")
      .reduce((total, transaksi) => total + Number(transaksi.amount), 0);
    const expense = transaksiBulanan
      .filter((transaksi) => transaksi.type === "pengeluaran")
      .reduce((total, transaksi) => total + Number(transaksi.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
      count: transaksiBulanan.length,
      expenseCount: transaksiBulanan.filter(
        (transaksi) => transaksi.type === "pengeluaran"
      ).length
    };
  }, [transaksiBulanan]);

  const dataGrafik = useMemo(() => {
    const kelompok = transaksiBulanan
      .filter((transaksi) => transaksi.type === "pengeluaran")
      .reduce((hasil, transaksi) => {
        const kategori = kategoriMap.get(transaksi.categoryId) ?? categories[0];
        hasil[kategori.id] = {
          name: kategori.nama,
          value: (hasil[kategori.id]?.value || 0) + Number(transaksi.amount),
          color: kategori.warna
        };
        return hasil;
      }, {});

    return Object.values(kelompok);
  }, [categories, kategoriMap, transaksiBulanan]);

  const kategoriTerbesar = useMemo(() => {
    if (dataGrafik.length === 0) {
      return { name: "Belum ada", value: 0, color: "#64748b" };
    }

    return [...dataGrafik].sort((a, b) => b.value - a.value)[0];
  }, [dataGrafik]);

  const penggunaanAnggaran = useMemo(
    () =>
      categories.map((kategori) => {
        const terpakai = transaksiBulanan
          .filter(
            (transaksi) =>
              transaksi.type === "pengeluaran" &&
              transaksi.categoryId === kategori.id
          )
          .reduce((total, transaksi) => total + Number(transaksi.amount), 0);
        const budget = Number(kategori.budget) || 0;
        const persen =
          budget > 0 ? Math.min(100, Math.round((terpakai / budget) * 100)) : 0;

        return { ...kategori, terpakai, persen, sisa: Math.max(0, budget - terpakai) };
      }),
    [categories, transaksiBulanan]
  );

  const totalAnggaran = penggunaanAnggaran.reduce(
    (total, kategori) => total + Number(kategori.budget || 0),
    0
  );

  const pengeluaranTerurut = useMemo(() => {
    const daftar = transaksiBulanan.filter(
      (transaksi) => transaksi.type === "pengeluaran"
    );

    return [...daftar].sort((a, b) => {
      if (expenseSort === "terlama") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      if (expenseSort === "terbesar") {
        return Number(b.amount) - Number(a.amount);
      }

      if (expenseSort === "terkecil") {
        return Number(a.amount) - Number(b.amount);
      }

      if (expenseSort === "kategori") {
        const kategoriA = kategoriMap.get(a.categoryId)?.nama ?? "";
        const kategoriB = kategoriMap.get(b.categoryId)?.nama ?? "";
        return kategoriA.localeCompare(kategoriB, "id");
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [expenseSort, kategoriMap, transaksiBulanan]);

  function tambahTransaksi(event) {
    event.preventDefault();

    const deskripsi = text.trim();
    const nominal = Number(amount);

    if (!deskripsi) {
      setError("Deskripsi tidak boleh kosong.");
      return;
    }

    if (!Number.isFinite(nominal) || nominal <= 0) {
      setError("Nominal harus lebih dari nol dan tidak boleh negatif.");
      return;
    }

    if (!date) {
      setError("Tanggal transaksi wajib dipilih.");
      return;
    }

    setTransactions((daftarSaatIni) => [
      {
        id: crypto.randomUUID(),
        text: deskripsi,
        amount: nominal,
        type: "pengeluaran",
        categoryId,
        date: new Date(`${date}T12:00:00`).toISOString()
      },
      ...daftarSaatIni
    ]);

    setText("");
    setAmount("");
    setCategoryId(categories[0]?.id ?? "makanan");
    setDate(tanggalHariIni());
    setError("");
    setActiveView("pengeluaran");
  }

  function tambahKategori(event) {
    event.preventDefault();

    const nama = newCategoryName.trim();
    const budget = Number(newCategoryBudget) || 0;

    if (!nama) {
      setError("Nama kategori tidak boleh kosong.");
      return;
    }

    if (categories.some((kategori) => kategori.nama.toLowerCase() === nama.toLowerCase())) {
      setError("Kategori dengan nama tersebut sudah ada.");
      return;
    }

    const index = categories.length;
    const kelasWarna = ambilKelasWarna(newCategoryColor);
    const kategoriBaru = {
      id: buatIdKategori(nama),
      nama,
      budget: Math.max(0, budget),
      warna: newCategoryColor || warnaKategori[index % warnaKategori.length],
      kelas: kelasWarna || kelasKategori[index % kelasKategori.length],
      ikon: "umum",
      bawaan: false
    };

    setCategories((daftarSaatIni) => [...daftarSaatIni, kategoriBaru]);
    setCategoryId(kategoriBaru.id);
    setNewCategoryName("");
    setNewCategoryBudget("");
    setNewCategoryColor(warnaKategori[(index + 1) % warnaKategori.length]);
    setError("");
  }

  function mulaiEdit(transaksi) {
    setEditingId(transaksi.id);
    setEditDraft({
      text: transaksi.text,
      amount: String(transaksi.amount),
      type: transaksi.type,
      categoryId: transaksi.categoryId,
      date: new Date(transaksi.date).toISOString().slice(0, 10)
    });
    setError("");
  }

  function simpanEdit(id) {
    if (!editDraft) {
      return;
    }

    const deskripsi = editDraft.text.trim();
    const nominal = Number(editDraft.amount);

    if (!deskripsi) {
      setError("Deskripsi edit tidak boleh kosong.");
      return;
    }

    if (!Number.isFinite(nominal) || nominal <= 0) {
      setError("Nominal edit harus lebih dari nol dan tidak boleh negatif.");
      return;
    }

    setTransactions((daftarSaatIni) =>
      daftarSaatIni.map((transaksi) =>
        transaksi.id === id
          ? {
              ...transaksi,
              text: deskripsi,
              amount: nominal,
              type: editDraft.type,
              categoryId: editDraft.categoryId,
              date: new Date(`${editDraft.date}T12:00:00`).toISOString()
            }
          : transaksi
      )
    );
    setEditingId(null);
    setEditDraft(null);
    setError("");
  }

  function hapusTransaksi(id) {
    setTransactions((daftarSaatIni) =>
      daftarSaatIni.filter((transaksi) => transaksi.id !== id)
    );
  }

  function mulaiEditKategori(kategori) {
    setEditingCategoryId(kategori.id);
    setCategoryDraft({
      nama: kategori.nama,
      budget: String(kategori.budget),
      warna: kategori.warna
    });
    setError("");
  }

  function simpanEditKategori(id) {
    if (!categoryDraft) {
      return;
    }

    const nama = categoryDraft.nama.trim();
    const budget = Math.max(0, Number(categoryDraft.budget) || 0);
    const warna = categoryDraft.warna || warnaKategori[0];

    if (!nama) {
      setError("Nama kategori tidak boleh kosong.");
      return;
    }

    if (
      categories.some(
        (kategori) =>
          kategori.id !== id && kategori.nama.toLowerCase() === nama.toLowerCase()
      )
    ) {
      setError("Nama kategori tersebut sudah dipakai.");
      return;
    }

    setCategories((daftarSaatIni) =>
      daftarSaatIni.map((kategori) =>
        kategori.id === id
          ? { ...kategori, nama, budget, warna, kelas: ambilKelasWarna(warna) }
          : kategori
      )
    );
    setEditingCategoryId(null);
    setCategoryDraft(null);
    setError("");
  }

  function hapusKategori(id) {
    const masihDipakai = transactions.some((transaksi) => transaksi.categoryId === id);

    if (masihDipakai) {
      setError("Kategori tidak bisa dihapus karena masih dipakai transaksi.");
      return;
    }

    setCategories((daftarSaatIni) => daftarSaatIni.filter((kategori) => kategori.id !== id));

    if (categoryId === id) {
      setCategoryId(categories.find((kategori) => kategori.id !== id)?.id ?? "");
    }
  }

  function renderFormTransaksi() {
    return (
      <form
        onSubmit={tambahTransaksi}
        className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-5 shadow-2xl shadow-slate-950/20"
      >
        <div>
          <h2 className="text-xl font-semibold text-white">Tambah Transaksi</h2>
          <p className="mt-1 text-sm text-slate-400">
            Masukkan pengeluaran dengan nominal positif.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Deskripsi
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              className={inputDasar()}
              placeholder="Contoh: Makan siang"
              type="text"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Nominal
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className={inputDasar()}
              placeholder="50000"
              type="number"
              min="1"
              step="1"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Tanggal
            <input
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={inputDasar()}
              type="date"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Kategori
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className={inputDasar()}
            >
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-h-5 text-sm font-medium text-rose-300" role="alert">
            {error}
          </p>
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

  function renderDaftarPengeluaran() {
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
              onChange={(event) => setExpenseSort(event.target.value)}
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
              const IkonKategori = ambilIkon(infoKategori);
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
                        onChange={(event) =>
                          setEditDraft({ ...editDraft, text: event.target.value })
                        }
                        className={inputDasar()}
                        type="text"
                      />
                      <input
                        value={editDraft.amount}
                        onChange={(event) =>
                          setEditDraft({ ...editDraft, amount: event.target.value })
                        }
                        className={inputDasar()}
                        type="number"
                        min="1"
                        step="1"
                      />
                      <input
                        value={editDraft.date}
                        onChange={(event) =>
                          setEditDraft({ ...editDraft, date: event.target.value })
                        }
                        className={inputDasar()}
                        type="date"
                      />
                      <select
                        value={editDraft.categoryId}
                        onChange={(event) =>
                          setEditDraft({ ...editDraft, categoryId: event.target.value })
                        }
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
                          onClick={() => simpanEdit(transaksi.id)}
                          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
                        >
                          <Save className="h-4 w-4" aria-hidden="true" />
                          Simpan
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditDraft(null);
                          }}
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
                          onClick={() => mulaiEdit(transaksi)}
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-200 transition hover:bg-blue-500/20"
                          aria-label={`Edit pengeluaran ${transaksi.text}`}
                        >
                          <Edit3 className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => hapusTransaksi(transaksi.id)}
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
      </section>
    );
  }

  function renderAnggaran() {
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

        <form
          onSubmit={tambahKategori}
          className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]"
        >
          <input
            value={newCategoryName}
            onChange={(event) => setNewCategoryName(event.target.value)}
            className={inputDasar()}
            placeholder="Kategori baru"
            type="text"
          />
          <input
            value={newCategoryBudget}
            onChange={(event) => setNewCategoryBudget(event.target.value)}
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
            const Ikon = ambilIkon(item);
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
                      onChange={(event) =>
                        setCategoryDraft({ ...categoryDraft, nama: event.target.value })
                      }
                      className={inputDasar()}
                      type="text"
                    />
                    <input
                      value={categoryDraft.budget}
                      onChange={(event) =>
                        setCategoryDraft({ ...categoryDraft, budget: event.target.value })
                      }
                      className={inputDasar()}
                      type="number"
                      min="0"
                      step="1"
                    />
                    <button
                      type="button"
                      onClick={() => simpanEditKategori(item.id)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      <Save className="h-4 w-4" aria-hidden="true" />
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategoryId(null);
                        setCategoryDraft(null);
                      }}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 font-semibold text-slate-300 transition hover:border-slate-600"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                      Batal
                    </button>
                    <div className="md:col-span-4">
                      <PilihanWarna
                        nilaiAktif={categoryDraft.warna}
                        onPilih={(warna) =>
                          setCategoryDraft({ ...categoryDraft, warna })
                        }
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
                        onClick={() => mulaiEditKategori(item)}
                        className="grid h-10 w-10 place-items-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-200 transition hover:bg-blue-500/20"
                        aria-label={`Edit kategori ${item.nama}`}
                      >
                        <Edit3 className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => hapusKategori(item.id)}
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
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
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
              onChange={(event) =>
                setSelectedMonth(event.target.value || bulanSaatIni())
              }
              className="min-h-11 rounded-lg border border-slate-700 bg-slate-800 px-3 text-white outline-none focus:border-emerald-400"
            />
          </label>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <KartuNavigasi
            aktif={activeView === "ringkasan"}
            judul="Ringkasan"
            nilai={formatRupiah.format(ringkasanBulanan.expense)}
            keterangan={`${ringkasanBulanan.count} transaksi bulan ini`}
            Ikon={PieChartIcon}
            warna="bg-blue-500/15 text-blue-200"
            onClick={() => setActiveView("ringkasan")}
          />
          <KartuNavigasi
            aktif={activeView === "pengeluaran"}
            judul="Pengeluaran"
            nilai={`${ringkasanBulanan.expenseCount} item`}
            keterangan="Lihat daftar dan urutkan pengeluaran"
            Ikon={ArrowDownCircle}
            warna="bg-rose-500/15 text-rose-200"
            onClick={() => setActiveView("pengeluaran")}
          />
          <KartuNavigasi
            aktif={activeView === "anggaran"}
            judul="Anggaran"
            nilai={formatRupiah.format(totalAnggaran)}
            keterangan={`${categories.length} kategori dapat dikelola`}
            Ikon={Target}
            warna="bg-emerald-500/15 text-emerald-200"
            onClick={() => setActiveView("anggaran")}
          />
        </section>

        {activeView === "ringkasan" && (
          <section className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-5 shadow-2xl shadow-slate-950/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Ringkasan Bulanan
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {formatBulan.format(new Date(`${selectedMonth}-01T00:00:00`))}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveView("pengeluaran")}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-rose-400/20 bg-rose-500/10 px-4 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
              >
                <ArrowDownCircle className="h-4 w-4" aria-hidden="true" />
                Lihat Pengeluaran
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Total Transaksi</p>
                <strong className="mt-2 block text-2xl font-bold text-white">
                  {ringkasanBulanan.count} transaksi
                </strong>
              </div>
              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Total Pengeluaran</p>
                <strong className="mt-2 block text-2xl font-bold text-rose-300">
                  {formatRupiah.format(ringkasanBulanan.expense)}
                </strong>
              </div>
              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-sm text-slate-400">Kategori Terbesar</p>
                <strong className="mt-2 block break-words text-2xl font-bold text-white">
                  {kategoriTerbesar.name}
                </strong>
                <span className="mt-1 block text-sm text-slate-400">
                  {formatRupiah.format(kategoriTerbesar.value)}
                </span>
              </div>
            </div>

            <section className="mt-6 rounded-lg border border-slate-700 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Piechart Pengeluaran per Kategori
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Distribusi pengeluaran pada bulan terpilih.
                  </p>
                </div>
                <PieChartIcon className="h-5 w-5 text-blue-200" aria-hidden="true" />
              </div>

              <div className="mt-5 h-72">
                {dataGrafik.length === 0 ? (
                  <div className="grid h-full place-items-center rounded-lg border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center">
                    <div>
                      <CreditCard className="mx-auto h-10 w-10 text-slate-500" aria-hidden="true" />
                      <p className="mt-3 text-sm font-medium text-slate-300">
                        Belum ada data pengeluaran.
                      </p>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dataGrafik}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={72}
                        outerRadius={104}
                        paddingAngle={4}
                        stroke="#0f172a"
                        strokeWidth={4}
                      >
                        {dataGrafik.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<TooltipGrafik />} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="mt-5 grid gap-3">
                {dataGrafik.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3 rounded-lg bg-slate-900/70 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-slate-300">{item.name}</span>
                    </div>
                    <strong className="text-sm text-white">
                      {formatRupiah.format(item.value)}
                    </strong>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeView === "pengeluaran" && (
          <section className="grid gap-6">
            {renderFormTransaksi()}
            {renderDaftarPengeluaran()}
          </section>
        )}

        {activeView === "anggaran" && renderAnggaran()}
      </div>
    </main>
  );
}
