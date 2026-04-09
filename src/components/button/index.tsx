import clsx from "clsx";
import { ComponentProps } from "react";

type ButtonVariants = "default" | "ghost" | "danger";
type ButtonSizes = "sm" | "md" | "lg";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
}

export function Button({
  variant = "default",
  size = "md",
  ...btnProps
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx(
      "bg-blue-600 text-blue-100 py-1 px-2 rounded-sm hover:bg-blue-700",
    ),
    ghost: clsx(
      "bg-slate-200 text-slate-900 py-2 px-4 rounded-md hover:bg-slate-300",
    ),
    danger: clsx(
      "bg-red-600 text-red-100 py-4 px-6 rounded-lg hover:bg-red-700",
    ),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx("text-xs/tight", "[&_svg]:w-3 [&_svg]:h-3 gap-1"),
    md: clsx("text-base/tight", "[&_svg]:w-4 [&_svg]:h-4 gap-2"),
    lg: clsx("text-lg/tight", "[&_svg]:w-5 [&_svg]:h-5 gap-3"),
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    "flex items-center justify-center cursor-pointer transition",
    "disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed",
    btnProps.className,
  );

  return <button {...btnProps} className={buttonClasses} />;
}
