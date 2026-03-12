import { Suspense } from "react";

import { PostsList } from "@/components/postsList";
import { SpinLoader } from "@/components/spinLoader";
import { PostFeatured } from "@/components/postFeatured";

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className="mb-16 min-h-20" />}>
        <PostFeatured />
        <PostsList />
      </Suspense>
    </>
  );
}
