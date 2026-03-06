import { postRepository } from "@/repositories/post";

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
