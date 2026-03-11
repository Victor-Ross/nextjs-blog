import { Suspense } from "react";

import { PostsList } from "@/components/postsList";
import { SpinLoader } from "@/components/spinLoader";
import { PostFeatured } from "@/components/postFeatured";

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader />}>
        <PostFeatured />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
