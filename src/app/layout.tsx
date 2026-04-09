import "./globals.css";

import type { Metadata } from "next";

import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { Container } from "@/components/container";
import { ToastifyContainer } from "@/components/toastifyContainer";

export const metadata: Metadata = {
  title: {
    default: "The blog - Este é um blog com Next.js",
    template: "%s | The Blog",
  },
  description: "Descrição da root layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
