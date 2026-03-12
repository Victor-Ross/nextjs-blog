import { ErrorMessage } from "@/components/errorMessage";

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle="Página nao encontrada"
      contentTitle="404"
      content="Erro 404 - A página que você está tentando acessar não existe neste site."
    />
  );
}
