import clsx from "clsx";

import { findAllPublicPosts } from "@/lib/post/queries";

import { PostSummary } from "../postSummary";
import { PostCoverImage } from "../postCoverImage";

export async function PostsList() {
  const posts = await findAllPublicPosts();

  return (
    <div
      className={clsx(
        "mb-16 grid grid-cols-1 gap-8",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
      )}
    >
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;

        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostCoverImage
              linkProps={{ href: postLink }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />
            <PostSummary
              postLink={postLink}
              postHeading="h2"
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              title={post.title}
            />
          </div>
        );
      })}
    </div>
  );
}
