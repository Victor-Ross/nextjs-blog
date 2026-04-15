"use server";

import { revalidateTag } from "next/cache";

import { asyncDelay } from "@/utils/async-delay";

import { postRepository } from "@/repositories/post";
import { PostModel } from "@/models/post-model";

export async function deletePostAction(id: string) {
  // Checar login do usuário

  // remover linhas abaixo
  await asyncDelay(2000);

  if (!id || typeof id !== "string") {
    return {
      error: "Id inválido",
    };
  }

  let post: PostModel;

  try {
    post = await postRepository.delete(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "[erro desconhecido]",
    };
  }

  // TODO: revalidate tag ou revalidade path
  revalidateTag("posts", { expire: 0 });
  revalidateTag(`post-${post.slug}`, { expire: 0 });

  return {
    error: "",
  };
}
