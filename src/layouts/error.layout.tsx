import LoadingBar from "@components/LoadingBar";
import { useIsRouting } from "@solidjs/router";
import { Suspense } from "solid-js";

export default function ErrorLayout(props: { children: any }) {
  const isRouting = useIsRouting();

  return (
    <div class="min-h-screen flex flex-col">
      <LoadingBar isLoading={isRouting()} />
      <main class="flex-1">
        <Suspense>{props.children}</Suspense>
      </main>
    </div>
  );
}
