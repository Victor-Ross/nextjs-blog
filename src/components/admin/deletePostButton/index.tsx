"use client";

import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";

import { deletePostAction } from "@/actions/post/delete-post-action";

import { Dialog } from "@/components/dialog";
import { toast } from "react-toastify";

interface DeletePostButtonProps {
  id: string;
  title: string;
}
export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    toast.dismiss();

    startTransition(async () => {
      const result = await deletePostAction(id);

      setShowDialog(false);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Post apagado com sucesso");
    });
  }

  return (
    <>
      <button
        className={clsx(
          "text-red-500 cursor-pointer hover:scale-120 hover:text-red-600 disabled:text-slate-600 disabled:cursor-not-allowed transition",
          "[&_svg]:h-4 [&_svg]:w-4",
        )}
        type="button"
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>

      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title="Apagar post?"
          content={`Tem certeza que deseja apagar o post "${title}"?`}
          onCancel={() => setShowDialog(false)}
          onConfirm={() => handleConfirm()}
          disabled={isPending}
        />
      )}
    </>
  );
}
