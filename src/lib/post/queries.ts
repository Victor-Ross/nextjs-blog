import { cache } from "react";
import { notFound } from "next/navigation";

import { postRepository } from "@/repositories/post";

export const findAllPublicPostsCached = cache(async () => {
  const post = await postRepository.findAllPublic().catch(() => undefined);

  if (!post) notFound();

  return post;
});

export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findPostBySlugCached = cache(
  async (slug: string) => await postRepository.findBySlug(slug),
);
