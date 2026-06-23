import { Component, createSignal, onCleanup, Show, createEffect } from "solid-js";

interface LoadingBarProps {
  isLoading: boolean;
}

const LoadingBar: Component<LoadingBarProps> = (props) => {
  const [progress, setProgress] = createSignal(0);
  let interval: number | undefined;

  const startProgress = () => {
    setProgress(0);
    let currentProgress = 0;

    interval = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += Math.random() * 10;
        setProgress(Math.min(currentProgress, 90));
      }
    }, 200) as unknown as number;
  };

  const completeProgress = () => {
    if (interval) clearInterval(interval);
    setProgress(100);
    setTimeout(() => setProgress(0), 500);
  };

  createEffect(() => {
    if (props.isLoading) {
      startProgress();
    } else {
      completeProgress();
    }
  });

  onCleanup(() => {
    if (interval) clearInterval(interval);
  });

  return (
    <>
      <Show when={props.isLoading || progress() > 0}>
        <div class="fixed top-0 left-0 right-0 z-[9999]">
          <div
            class="h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 transition-all duration-300 ease-out shadow-lg"
            style={{
              width: `${progress()}%`,
              "box-shadow": "0 0 10px rgba(var(--primary-500), 0.5)",
            }}
          />
        </div>
      </Show>

      <Show when={props.isLoading}>
        <div
          class="fixed inset-0 bg-white/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          style={{ "pointer-events": "none" }}
        />
      </Show>
    </>
  );
};

export default LoadingBar;
