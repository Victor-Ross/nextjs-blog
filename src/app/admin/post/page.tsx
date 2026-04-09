import { Metadata } from "next";
import { Suspense } from "react";

import { SpinLoader } from "@/components/spinLoader";
import { PostsListAdmin } from "@/components/admin/postsListAdmin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Post Admin",
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16 min-h-20" />}>
      <PostsListAdmin />
    </Suspense>
  );
}
