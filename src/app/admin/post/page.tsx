import { Metadata } from "next";

import { findAllAdminPostById } from "@/lib/post/queries/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Post Admin",
};

export default async function AdminPostPage() {
  const posts = await findAllAdminPostById();

  return (
    <div className="py-16">
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
