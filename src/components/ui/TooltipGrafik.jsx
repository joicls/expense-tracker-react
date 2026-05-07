import { formatRupiah } from "../../utils/formatters.js";

export function TooltipGrafik({ active, payload }) {
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
