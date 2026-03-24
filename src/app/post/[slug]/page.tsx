import { Metadata } from "next";
import { Suspense } from "react";

import { postRepository } from "@/repositories/post";

import SinglePost from "@/components/singlePost";
import { SpinLoader } from "@/components/spinLoader";

interface PostSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await postRepository.findBySlugPublic(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className="mb-16 min-h-20" />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
