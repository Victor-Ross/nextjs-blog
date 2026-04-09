import clsx from "clsx";

interface ErrorMessageProps {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
}

export function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={clsx(
          "mb-16 p-8 min-h-80 flex items-center justify-center text-center bg-slate-900 text-slate-100 rounded-xl",
        )}
      >
        <div>
          <h1 className="mb-4 text-7xl/tight font-extrabold">{contentTitle}</h1>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}
