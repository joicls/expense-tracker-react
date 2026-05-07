export const warnaKategori = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b",
  "#f87171", "#fb923c", "#fbbf24", "#fde047", "#a3e635", "#4ade80",
  "#34d399", "#2dd4bf", "#22d3ee", "#38bdf8", "#60a5fa", "#818cf8",
  "#a78bfa", "#c084fc", "#e879f9", "#f472b6", "#fb7185", "#94a3b8"
];

export const kelasKategori = [
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

const namaWarna = [
  "Merah", "Oranye", "Amber", "Kuning", "Lime", "Hijau",
  "Emerald", "Teal", "Cyan", "Langit", "Biru", "Indigo",
  "Violet", "Ungu", "Fuchsia", "Pink", "Rose", "Slate",
  "Merah Muda", "Oranye Muda", "Amber Muda", "Kuning Muda", "Lime Muda", "Hijau Muda",
  "Emerald Muda", "Teal Muda", "Cyan Muda", "Langit Muda", "Biru Muda", "Indigo Muda",
  "Violet Muda", "Ungu Muda", "Fuchsia Muda", "Pink Muda", "Rose Muda", "Slate Muda"
];

export const pilihanWarnaKategori = warnaKategori.map((warna, index) => ({
  warna,
  kelas: kelasKategori[index],
  nama: namaWarna[index]
}));
