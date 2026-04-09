"use server";

import { drizzleDb } from "@/db/drizzle";
import { postsTable } from "@/db/drizzle/schemas";
import { postRepository } from "@/repositories/post";
import { asyncDelay } from "@/utils/async-delay";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  // Checar login do usuário

  // remover linhas abaixo
  await asyncDelay(2000);

  if (!id || typeof id !== "string") {
    return {
      error: "Id inválido",
    };
  }

  const post = await postRepository.findById(id).catch(() => null);

  if (!post) {
    return {
      error: "Post não existe",
    };
  }

  // TODO: Mover este método para o repositório
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  // TODO: revalidate tag ou revalidade path
  revalidateTag("posts", `post-${post.slug}`);

  return {
    error: "",
  };
}
