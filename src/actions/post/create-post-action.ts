"use server";

import { v4 as uuidV4 } from "uuid";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import { PostCreateSchema } from "@/lib/post/validations";

import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

import { PostModel } from "@/models/post-model";

import { postRepository } from "@/repositories/post";

import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { asyncDelay } from "@/utils/async-delay";

interface CreatePostActionState {
  formState: PublicPost;
  errors: string[];
  success?: true;
}

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO: Verificar se usuário está logado

  await asyncDelay(3000, true);

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());

  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors,
    };
  }

  const validPostData = zodParsedObj.data;

  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await postRepository.create(newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: newPost,
        errors: [error.message],
      };
    }

    return {
      formState: newPost,
      errors: ["Erro ao criar post [erro desconhecido]"],
    };
  }

  revalidateTag("posts", { expire: 0 });

  redirect(`/admin/post/${newPost.id}`);
}
