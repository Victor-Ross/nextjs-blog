"use client";

import { useState } from "react";

import { Button } from "@/components/button";
import { ImageUploader } from "../imageUploader";
import { MarkdownEditor } from "@/components/markdownEditor";

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState("Este é **um exemplo**.");

  return (
    <form action="" className="mb-16">
      <div className="mt-4">
        <ImageUploader />
        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
}
