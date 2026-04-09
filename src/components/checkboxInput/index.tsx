import clsx from "clsx";
import { ComponentProps, useId } from "react";

interface InputProps extends ComponentProps<"input"> {
  labelText?: string;
  type?: "checkbox";
}

export function Input({
  labelText = "",
  type = "checkbox",
  ...inputProps
}: InputProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      <input
        {...inputProps}
        className={clsx(
          "w-4 h-4 outline-none focus:ring-2 focus:ring-blue-500",
          inputProps.className,
        )}
        id={id}
        type={type}
      />
      {labelText && (
        <label className="text-base" htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
