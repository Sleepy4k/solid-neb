import { Component, For } from "solid-js";
import LazyImage from "@components/LazyImage";

export interface TutorialStep {
  number: number;
  text: string;
  image?: string;
  imageResolution?: string;
  note?: string;
}

interface RenderStepsProps {
  steps: TutorialStep[];
  note?: string;
}

const RenderSteps: Component<RenderStepsProps> = (props) => {
  return (
    <div class="space-y-6 sm:space-y-8">
      <For each={props.steps}>
        {(step) => (
          <div class="space-y-3 sm:space-y-4">
            <div class="flex items-start gap-3 sm:gap-4">
              {step.number > 0 && (
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  {step.number}
                </div>
              )}
              <div class="flex-1 pt-1 sm:pt-2">
                <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {step.text}
                </p>

                {step.note && (
                  <div class="mt-3 p-3 sm:p-4 bg-gray-100 rounded-lg border border-gray-200">
                    <p class="text-xs sm:text-sm font-mono text-gray-700 break-all">
                      {step.note}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {step.image && (
              <div class={step.number > 0 ? "ml-0 sm:ml-14" : ""}>
                <LazyImage
                  src={step.image}
                  alt={`Tutorial step ${step.number > 0 ? step.number : "intro"}`}
                  class="shadow-sm"
                  aspectRatio={
                    step.imageResolution ? step.imageResolution : "16/9"
                  }
                />
              </div>
            )}
          </div>
        )}
      </For>

      {props.note && (
        <div class="p-4 sm:p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <div class="flex items-start gap-2 sm:gap-3">
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p class="text-xs sm:text-sm font-semibold text-blue-900 mb-1">
                Note:
              </p>
              <p class="text-xs sm:text-sm text-blue-800 leading-relaxed">
                {props.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderSteps;
