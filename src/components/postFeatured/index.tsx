import { findAllPublicPostsCached } from "@/lib/post/queries";

import { PostSummary } from "../postSummary";
import { PostCoverImage } from "../postCoverImage";

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();

  const post = posts[0];

  const postLink = `/post/${post.slug}`;

  return (
    <div className="flex flex-col gap-4 group">
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
        postHeading="h1"
        createdAt={post.createdAt}
        excerpt={post.excerpt}
        title={post.title}
      />
    </div>
  );
}
