interface PostSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return <div>{slug}</div>;
}
