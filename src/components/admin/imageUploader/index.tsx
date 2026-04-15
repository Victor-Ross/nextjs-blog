"use client";

import { toast } from "react-toastify";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";

import { IMAGE_UPLOADER_MAX_SIZE_IN_BYTES } from "@/lib/constants";

import { UploadImageAction } from "@/actions/upload/upload-image-action";

import { Button } from "@/components/button";

interface ImageUploaderProps {
  disabled?: boolean;
}

export function ImageUploader({ disabled }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, startTransition] = useTransition();

  const [imageUrl, setImageUrl] = useState("");

  function handleChooseFile() {
    if (fileInputRef.current === null) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (fileInputRef.current === null) {
      setImageUrl("");
      return;
    }

    const fileInput = fileInputRef.current;

    const file = fileInput.files?.[0];

    if (!file) {
      setImageUrl("");
      return;
    }

    if (file.size > IMAGE_UPLOADER_MAX_SIZE_IN_BYTES) {
      const readableMaxSize = IMAGE_UPLOADER_MAX_SIZE_IN_BYTES / 1024;
      toast.error(`Imagem muito grande. Máx: ${readableMaxSize}kb`);

      fileInput.value = "";

      {
        setImageUrl("");
        return;
      }
    }

    const formData = new FormData();

    formData.append("file", file);

    startTransition(async () => {
      const result = await UploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        setImageUrl("");
        {
          setImageUrl("");
          return;
        }
      }

      setImageUrl(result.url);

      toast.success("Imagem enviada com sucesso");
    });

    fileInput.value = "";
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      <Button
        className="self-start"
        type="button"
        onClick={handleChooseFile}
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      {!!imageUrl && (
        <div className="flex flex-col gap-4">
          <p className="font-bold">URL: {imageUrl}</p>

          {/* eslint-disable-next-line */}
          <img className="rounded" src={imageUrl} />
        </div>
      )}
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        name="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}
