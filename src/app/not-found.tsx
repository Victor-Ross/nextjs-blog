import clsx from "clsx";

export default function NotFoundPage() {
  return (
    <div
      className={clsx(
        "mb-16 p-8 min-h-80 flex items-center justify-center text-center bg-slate-900 text-slate-100 rounded-xl",
      )}
    >
      <div>
        <h1 className="mb-4 text-7xl/tight font-extrabold">404</h1>
        <p>
          Erro 404 - A página que você está tentando acessar não existe neste
          site.
        </p>
      </div>
    </div>
  );
}
