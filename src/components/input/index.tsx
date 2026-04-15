import clsx from "clsx";
import { ComponentProps, useId } from "react";

interface InputProps extends ComponentProps<"input"> {
  labelText?: string;
}

export function InputText({ labelText = "", ...inputProps }: InputProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...inputProps}
        className={clsx(
          "bg-white outline-0 ring-2 ring-slate-400 rounded",
          "p-2 transition focus:ring-blue-600",
          "placeholder-slate-300",
          "disabled:bg-slate-300 disabled:text-slate-400 disabled:placeholder-slate-300 disabled:cursor-not-allowed",
          "read-only:bg-slate-100",
          inputProps.className,
        )}
        id={id}
      />
    </div>
  );
}
