interface AdminPostIdProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminPostIdPage({ params }: AdminPostIdProps) {
  const { id } = await params;

  return (
    <div className="py-16 text-6xl">
      <h1>Admin Post {id}</h1>
    </div>
  );
}
