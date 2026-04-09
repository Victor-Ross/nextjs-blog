"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };

    handler();
  }, [pathname]);

  const navClasses = clsx(
    "mb-8 flex flex-col bg-slate-900 text-slate-100 rounded-lg",
    "sm:flex-row sm:flex-wrap",
    !isOpen && "h-10",
    !isOpen && "overflow-hidden",
    "sm:overflow-visible sm:h-auto",
  );
  const linkClasses = clsx(
    "h-10 px-4 flex items-center justify-start gap-2",
    "shrink-0 rounded-lg cursor-pointer",
    "hover:bg-slate-800 transition",
    "[&>svg]:w-4 [&>svg]:h-4",
  );
  const openCloseBtnClasses = clsx(
    linkClasses,
    "text-blue-200 italic",
    "sm:hidden",
  );

  return (
    <nav className={navClasses}>
      <button
        className={openCloseBtnClasses}
        onClick={() => setIsOpen((s) => !s)}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a className={linkClasses} href="/" target="_blank">
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href="/admin/post">
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href="/admin/post/new">
        <PlusIcon />
        Criar post
      </Link>
    </nav>
  );
}
