export function inputDasar(kelasTambahan = "") {
  return `min-h-12 rounded-lg border border-slate-700 bg-slate-950 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 ${kelasTambahan}`;
}

export function InputField({ label, value, onChange, type = "text", placeholder, min, step, children }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-300">
      {label}
      {children ? (
        children
      ) : (
        <input
          value={value}
          onChange={onChange}
          className={inputDasar()}
          placeholder={placeholder}
          type={type}
          min={min}
          step={step}
        />
      )}
    </label>
  );
}
