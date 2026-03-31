import { cache } from "react";

import { postRepository } from "@/repositories/post";

export const findAllAdminPostById = cache(
  async () => await postRepository.findAll(),
);

export const findAdminPostById = cache(
  async (id: string) => await postRepository.findById(id),
);
