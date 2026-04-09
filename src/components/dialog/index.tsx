"use client";

import clsx from "clsx";
import { ReactNode } from "react";

import { Button } from "../button";

interface DialogProps {
  isVisible?: boolean;
  title: string;
  content: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export function Dialog({
  isVisible = false,
  title,
  content,
  onCancel,
  onConfirm,
  disabled = false,
}: DialogProps) {
  if (!isVisible) {
    return null;
  }

  function handleCancel() {
    if (disabled) return;
    onCancel();
  }

  return (
    <div
      className={clsx(
        "fixed z-50 inset-0 bg-black/50 backdrop-blur-xs",
        "flex items-center justify-center",
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          "flex flex-col gap-6",
          "p-6 mx-6 max-w-2xl bg-slate-100 rounded-lg",
          "shadow-lg shadow-black/30 text-center",
        )}
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold" id="dialog-title">
          {title}
        </h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            autoFocus
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
