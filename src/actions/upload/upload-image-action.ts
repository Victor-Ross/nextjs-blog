"use server";

import { extname, resolve } from "path";
import { mkdir, writeFile } from "fs/promises";

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIRECTORY,
  IMAGE_UPLOADER_MAX_SIZE_IN_BYTES,
} from "@/lib/constants";
import { asyncDelay } from "@/utils/async-delay";

interface UploadImageActionResult {
  url: string;
  error: string;
}

export async function UploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  // TODO: Remover delay

  await asyncDelay(5000, true);

  const makeResult = ({ url = "", error = "" }) => {
    return {
      url,
      error,
    };
  };

  if (formData instanceof FormData === false) {
    return makeResult({ error: "Dados inválidos" });
  }

  const file = formData.get("file");

  if (file instanceof File === false) {
    return makeResult({ error: "Arquivo inválido" });
  }

  if (file.size > IMAGE_UPLOADER_MAX_SIZE_IN_BYTES) {
    return makeResult({ error: "Arquivo muito grande" });
  }

  if (file.type.startsWith("image/") === false) {
    return makeResult({ error: "Arquivo inválido" });
  }

  const imageExtension = extname(file.name);

  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(
    process.cwd(),
    "public",
    IMAGE_UPLOAD_DIRECTORY,
  );

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;

  return makeResult({ url });
}
