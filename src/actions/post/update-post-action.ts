"use server";

import { revalidateTag } from "next/cache";

import { PostUpdateSchema } from "@/lib/post/validations";

import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

import { PostModel } from "@/models/post-model";

import { postRepository } from "@/repositories/post";

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from "@/dto/post/dto";
import { asyncDelay } from "@/utils/async-delay";

interface UpdatePostActionState {
  formState: PublicPost;
  errors: string[];
  success?: true;
}

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  // TODO: Verificar se usuário está logado

  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id")?.toString();

  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());

  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors,
    };
  }

  const validPostData = zodParsedObj.data;

  const newPost = {
    ...validPostData,
  };

  let post: PostModel;

  try {
    post = await postRepository.update(id, newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [error.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ["Erro ao criar post [erro desconhecido]"],
    };
  }

  revalidateTag("posts", { expire: 0 });
  revalidateTag(`post-${post.slug}`, { expire: 0 });

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: true,
  };
}
