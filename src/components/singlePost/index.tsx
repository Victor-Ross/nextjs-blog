import Image from "next/image";

import { postRepository } from "@/repositories/post";

import { PostDate } from "../postDate";
import { PostHeading } from "../postHeading";
import { SafeMarkdown } from "../safeMarkdown";

interface SinglePostProps {
  slug: string;
}

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await postRepository.findBySlug(slug);

  return (
    <article className="mb-16">
      <header className="group mb-4 flex flex-col gap-4">
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
        />

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

        <p>
          {post.author} | <PostDate datetime={post.createdAt} />
        </p>
      </header>

      <p className="mb-4 text-xl text-slate-600">{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
