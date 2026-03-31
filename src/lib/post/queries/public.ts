import { cache } from "react";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

import { postRepository } from "@/repositories/post";

export const findAllPublicPostsCached = cache(
  unstable_cache(
    async () => {
      return await postRepository.findAllPublic().catch(() => undefined);
    },
    ["posts"],
    {
      tags: ["posts"],
    },
  ),
);

export const findPublicPostBySlugCached = cache((slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      const post = await postRepository.findBySlugPublic(slug);

      if (!post) notFound();

      return post;
    },
    [`post-${slug}`],
    { tags: [`post-${slug}`] },
  )(slug);
});
