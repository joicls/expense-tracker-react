export const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

export const formatTanggal = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

export const formatBulan = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  year: "numeric"
});
