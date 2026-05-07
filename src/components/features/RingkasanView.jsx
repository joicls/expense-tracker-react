import { useState, useMemo } from "react";
import { ArrowDownCircle, CreditCard, PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { formatRupiah, formatBulan } from "../../utils/formatters.js";
import { TooltipGrafik } from "../ui/index.js";

export function RingkasanView({
  selectedMonth,
  ringkasanBulanan,
  kategoriTerbesar,
  dataGrafik,
  onNavigateToExpenses,
  categories,
  transactions
}) {
  const [trendPeriod, setTrendPeriod] = useState(6); // default 6 bulan

  // Generate data untuk line chart trend
  const trendData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const months = [];
    const currentDate = new Date(`${selectedMonth}-01`);
    
    // Generate array bulan untuk periode yang dipilih
    for (let i = trendPeriod - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      months.push(date.toISOString().slice(0, 7));
    }

    // Agregasi pengeluaran per bulan per kategori
    const data = months.map((month) => {
      const monthData = { month };
      
      categories.forEach((cat) => {
        const total = transactions
          .filter(
            (t) => t.type === "pengeluaran" && 
                   t.categoryId === cat.id && 
                   new Date(t.date).toISOString().startsWith(month)
          )
          .reduce((sum, t) => sum + Number(t.amount), 0);
        monthData[cat.id] = total;
      });
      
      return monthData;
    });

    return data;
  }, [transactions, categories, selectedMonth, trendPeriod]);

  // Format label bulan
  const formatMonthLabel = (monthStr) => {
    const [year, month] = monthStr.split("-");
    return `${month}/${year.slice(2)}`;
  };

  // Custom tooltip untuk line chart
  const LineTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm shadow-xl">
        <p className="font-semibold text-white mb-1">{formatMonthLabel(label)}</p>
        {payload.map((entry, index) => {
          const cat = categories.find((c) => c.id === entry.dataKey);
          if (!cat || entry.value === 0) return null;
          return (
            <p key={index} className="text-slate-300" style={{ color: cat.warna }}>
              {cat.nama}: {formatRupiah.format(entry.value)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <section className="rounded-lg border border-slate-700/80 bg-slate-800/80 p-5 shadow-2xl shadow-slate-950/20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Ringkasan Bulanan</h2>
          <p className="mt-1 text-sm text-slate-400">
            {formatBulan.format(new Date(`${selectedMonth}-01T00:00:00`))}
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToExpenses}
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
            <h2 className="text-xl font-semibold text-white">Piechart Pengeluaran per Kategori</h2>
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

      {/* Line Chart Section - Trend Pengeluaran */}
      <section className="mt-6 rounded-lg border border-slate-700 bg-slate-900/60 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">Trend Pengeluaran</h2>
              <p className="mt-1 text-sm text-slate-400">
                Kenaikan dan penurunan pengeluaran per kategori
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Periode:</span>
            <div className="flex rounded-lg border border-slate-700 bg-slate-950 p-1">
              {[3, 6, 12].map((period) => (
                <button
                  key={period}
                  onClick={() => setTrendPeriod(period)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    trendPeriod === period
                      ? "bg-emerald-500 text-slate-950"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {period} Bulan
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 h-80">
          {trendData.length === 0 || trendData.every((d) => 
            categories.every((cat) => d[cat.id] === 0)
          ) ? (
            <div className="grid h-full place-items-center rounded-lg border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center">
              <div>
                <TrendingUp className="mx-auto h-10 w-10 text-slate-500" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-slate-300">
                  Belum cukup data untuk trend {trendPeriod} bulan.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Tambahkan transaksi di beberapa bulan untuk melihat trend.
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8"
                  tickFormatter={formatMonthLabel}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tickFormatter={(value) => `Rp${(value / 1000000).toFixed(1)}M`}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip content={<LineTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: 20 }}
                  formatter={(value) => <span className="text-slate-300">{value}</span>}
                />
                {categories
                  .filter((cat) => trendData.some((d) => d[cat.id] > 0))
                  .map((cat) => (
                    <Line
                      key={cat.id}
                      type="monotone"
                      dataKey={cat.id}
                      name={cat.nama}
                      stroke={cat.warna}
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2, fill: cat.warna }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </section>
  );
}
