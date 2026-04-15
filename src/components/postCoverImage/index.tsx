import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { ComponentProps } from "react";

interface PostCoverImage {
  imageProps: ComponentProps<typeof Image>;
  linkProps: ComponentProps<typeof Link>;
}
export function PostCoverImage({ imageProps, linkProps }: PostCoverImage) {
  return (
    <Link
      className={clsx(
        "h-full w-full overflow-hidden rounded-xl",
        linkProps.className,
      )}
      {...linkProps}
    >
      <Image
        className={clsx(
          "h-full w-full object-cover object-center group-hover:scale-105 transition",
          imageProps.className,
        )}
        {...imageProps}
      />
    </Link>
  );
}
