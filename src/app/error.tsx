"use client";

import { useEffect } from "react";

import { ErrorMessage } from "@/components/errorMessage";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function RootErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle="Erro interno do servidor"
      contentTitle="500"
      content={
        <button onClick={() => reset()}>Clique para tentar novamente</button>
      }
    />
  );
}
