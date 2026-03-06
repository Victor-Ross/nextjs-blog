import { Suspense } from "react";

import { PostsList } from "@/components/postsList";
import { SpinLoader } from "@/components/spinLoader";

export default async function HomePage() {
  return (
    <div>
      <header>
        <h1 className="text-6xl font-bold text-center py-8">HEADERRRR</h1>
      </header>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
      <footer>
        <p className="text-6xl font-bold text-center py-8">footerRRR</p>
      </footer>
    </div>
  );
}
