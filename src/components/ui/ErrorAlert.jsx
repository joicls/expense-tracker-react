export function ErrorAlert({ message }) {
  if (!message) return null;
  
  return (
    <p className="min-h-5 text-sm font-medium text-rose-300" role="alert">
      {message}
    </p>
  );
}
