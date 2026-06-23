import { Component, createSignal, onMount, Show } from "solid-js";

interface LazyImageProps {
  src: string;
  alt: string;
  class?: string;
  aspectRatio?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: Component<LazyImageProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;

  const [isLoaded, setIsLoaded] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(true);
  const [hasError, setHasError] = createSignal(false);
  const [isIntersecting, setIsIntersecting] = createSignal(false);

  onMount(() => {
    if (!containerRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      },
    );

    observer.observe(containerRef);

    return () => observer.disconnect();
  });

  const handleLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    props.onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    props.onError?.();
  };

  const getPaddingBottom = () => {
    if (!props.aspectRatio) return "56.25%";

    const [width, height] = props.aspectRatio.split("/").map(Number);
    return `${(height / width) * 100}%`;
  };

  return (
    <div
      ref={containerRef}
      class={`relative overflow-hidden bg-gray-100 rounded-xl ${props.class || ""}`}
      style={{ "padding-bottom": getPaddingBottom() }}
    >
      <Show when={isLoading() && !hasError()}>
        <div class="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]">
          <div class="absolute inset-0 flex items-center justify-center">
            <svg
              class="w-12 h-12 text-gray-400 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </Show>

      <Show when={hasError()}>
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300">
          <svg
            class="w-16 h-16 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p class="text-sm font-medium text-gray-500">Image not found</p>
          <p class="text-xs text-gray-400 mt-1">{props.src}</p>
        </div>
      </Show>

      <Show when={isIntersecting()}>
        <img
          src={props.src}
          alt={props.alt}
          class={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded() ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      </Show>
    </div>
  );
};

export default LazyImage;
