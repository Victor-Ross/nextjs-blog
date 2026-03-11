import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Container } from "@/components/container";

import "./globals.css";
import Footer from "@/components/footer";

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
      </body>
    </html>
  );
}
