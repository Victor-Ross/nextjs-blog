import { drizzleDb } from "@/db/drizzle";

import { asyncDelay } from "@/utils/async-delay";

import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";

import { PostModel } from "@/models/post-model";

import { PostRepository } from "./post-repository";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    const posts = await drizzleDb.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.published, true),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.slug, slug), eq(posts.published, true)),
    });

    if (!post) {
      throw new Error("Post not found for slug");
    }

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error("Post not found for ID");
    }

    return post;
  }
}

// (async () => {
//   // const repo = new DrizzlePostRepository();

//   // const posts = await repo.findAllPublic();

//   // posts.forEach((post) => console.log(post.title));

//   // const post = await repo.findBySlugPublic("hello-world");
// })();
