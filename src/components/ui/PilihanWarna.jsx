import { pilihanWarnaKategori } from "../../constants/index.js";

export function PilihanWarna({ nilaiAktif, onPilih, label }) {
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
