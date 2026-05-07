import { PieChart as PieChartIcon, ArrowDownCircle, Target } from "lucide-react";
import { KartuNavigasi } from "../ui/index.js";
import { formatRupiah } from "../../utils/formatters.js";

export function NavigationCards({ 
  activeView, 
  onViewChange, 
  ringkasanBulanan, 
  totalAnggaran,
  categoriesCount 
}) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <KartuNavigasi
        aktif={activeView === "ringkasan"}
        judul="Ringkasan"
        nilai={formatRupiah.format(ringkasanBulanan.expense)}
        keterangan={`${ringkasanBulanan.count} transaksi bulan ini`}
        Ikon={PieChartIcon}
        warna="bg-blue-500/15 text-blue-200"
        onClick={() => onViewChange("ringkasan")}
      />
      <KartuNavigasi
        aktif={activeView === "pengeluaran"}
        judul="Pengeluaran"
        nilai={`${ringkasanBulanan.expenseCount} item`}
        keterangan="Lihat daftar dan urutkan pengeluaran"
        Ikon={ArrowDownCircle}
        warna="bg-rose-500/15 text-rose-200"
        onClick={() => onViewChange("pengeluaran")}
      />
      <KartuNavigasi
        aktif={activeView === "anggaran"}
        judul="Anggaran"
        nilai={formatRupiah.format(totalAnggaran)}
        keterangan={`${categoriesCount} kategori dapat dikelola`}
        Ikon={Target}
        warna="bg-emerald-500/15 text-emerald-200"
        onClick={() => onViewChange("anggaran")}
      />
    </section>
  );
}
