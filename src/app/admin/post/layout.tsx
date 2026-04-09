import { MenuAdmin } from "@/components/admin/menuAdmin";

interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: Readonly<PostLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
