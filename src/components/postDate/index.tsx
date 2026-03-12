import { formatDatetime, formatDistanceToNow } from "@/utils/format-datetime";

interface PostDateProps {
  datetime: string;
}

export function PostDate({ datetime }: PostDateProps) {
  return (
    <time
      className="block text-slate-600 text-sm/tight"
      dateTime={datetime}
      title={formatDistanceToNow(datetime)}
    >
      {formatDatetime(datetime)}
    </time>
  );
}
