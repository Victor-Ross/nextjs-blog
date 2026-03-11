import clsx from "clsx";

import { formatDatetime, formatDistanceToNow } from "@/utils/format-datetime";

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
      <time
        className="block text-slate-600 text-sm/tight"
        dateTime={createdAt}
        title={formatDistanceToNow(createdAt)}
      >
        {formatDatetime(createdAt)}
      </time>
      <PostHeading as={postHeading} url={postLink}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
