import { pilihanWarnaKategori, kelasKategori, warnaKategori } from "../constants/colors.js";

export function tanggalHariIni() {
  return new Date().toISOString().slice(0, 10);
}

export function bulanSaatIni() {
  return new Date().toISOString().slice(0, 7);
}

export function buatIdKategori(nama) {
  return (
    nama
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || crypto.randomUUID()
  );
}

export function ambilKelasWarna(warna) {
  return (
    pilihanWarnaKategori.find((pilihan) => pilihan.warna === warna)?.kelas ??
    kelasKategori[0]
  );
}

export function getWarnaByIndex(index) {
  return warnaKategori[index % warnaKategori.length];
}

export function getKelasByIndex(index) {
  return kelasKategori[index % kelasKategori.length];
}
