import { findAllPublicPostsCached } from "@/lib/post/queries/public";

import { PostSummary } from "../postSummary";
import { PostCoverImage } from "../postCoverImage";
import { ErrorMessage } from "../errorMessage";

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();

  if (posts === undefined || posts.length === 0) {
    return (
      <ErrorMessage
        contentTitle="Ops!"
        content="Ainda não criamos nenhum post."
      />
    );
  }

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
