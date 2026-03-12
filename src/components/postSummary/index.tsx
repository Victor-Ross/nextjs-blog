import clsx from "clsx";

import { PostDate } from "../postDate";
import { PostHeading } from "../postHeading";

interface PostSummaryProps {
  postHeading: "h1" | "h2";
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
}

export function PostSummary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className={clsx("flex flex-col gap-4", "sm:justify-center")}>
      <PostDate datetime={createdAt} />
      <PostHeading as={postHeading} url={postLink}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
