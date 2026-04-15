import { ManagePostForm } from "@/components/admin/managePostForm";
import { makePublicPostFromDb } from "@/dto/post/dto";
import { findAdminPostById } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Editar post",
};

interface AdminPostIdProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminPostIdPage({ params }: AdminPostIdProps) {
  const { id } = await params;

  const post = await findAdminPostById(id).catch();

  if (!post) {
    return notFound();
  }

  const publicPost = makePublicPostFromDb(post);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar post</h1>
      <ManagePostForm mode="update" publicPost={publicPost} />
    </div>
  );
}
