import Footer from "@components/Footer";
import LoadingBar from "@components/LoadingBar";
import Navbar from "@components/Navbar";
import PageLoader from "@components/PageLoader";
import { useIsRouting } from "@solidjs/router";
import { Suspense } from "solid-js";

interface HomeLayoutProps {
  children: any;
}

export default function HomeLayout(props: HomeLayoutProps) {
  const isRouting = useIsRouting();

  return (
    <div class="min-h-screen flex flex-col">
      <LoadingBar isLoading={isRouting()} />
      <Navbar />
      <main class="flex-1">
        <Suspense fallback={<PageLoader />}>{props.children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
