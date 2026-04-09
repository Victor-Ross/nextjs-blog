import clsx from "clsx";
import Link from "next/link";

import { findAllAdminPostById } from "@/lib/post/queries/admin";

import { ErrorMessage } from "../../errorMessage";
import { DeletePostButton } from "../deletePostButton";

export async function PostsListAdmin() {
  const posts = await findAllAdminPostById();

  if (posts === undefined || posts.length === 0) {
    return (
      <ErrorMessage contentTitle="Ei!" content="Vamos criar algum post?" />
    );
  }

  return (
    <div className="mb-16">
      {posts.map((post) => {
        return (
          <div
            className={clsx(
              "py-2 px-2 flex gap-2 items-center justify-between",
              !post.published && "bg-slate-400",
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
            {!post.published && (
              <span className="text-xs text-slate-600">(Não publicado)</span>
            )}

            <form>
              <input type="hidden" name="id" defaultValue={post.id} />
              <DeletePostButton id={post.id} title={post.title} />
            </form>
          </div>
        );
      })}
    </div>
  );
}
