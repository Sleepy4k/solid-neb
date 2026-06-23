import { Component, For, JSX } from "solid-js";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  children: JSX.Element;
}

const Tabs: Component<TabsProps> = (props) => {
  const handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    const tabs = props.tabs;
    let newIndex = currentIndex;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = tabs.length - 1;
    }

    if (newIndex !== currentIndex) {
      props.onTabChange(tabs[newIndex].key);
      const tabButtons = document.querySelectorAll('[role="tab"]');
      (tabButtons[newIndex] as HTMLElement)?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        class="flex border-b border-gray-200 mb-6 overflow-x-auto"
        aria-label="Tutorial sections"
      >
        <For each={props.tabs}>
          {(tab, index) => (
            <button
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={props.activeTab === tab.key}
              aria-controls={`panel-${tab.key}`}
              tabIndex={props.activeTab === tab.key ? 0 : -1}
              class={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative cursor-pointer hover:bg-gray-50
                ${
                  props.activeTab === tab.key
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              onClick={() => props.onTabChange(tab.key)}
              onKeyDown={(e) => handleKeyDown(e, index())}
            >
              {tab.label}
              {props.activeTab === tab.key && (
                <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
              )}
            </button>
          )}
        </For>
      </div>

      <div
        role="tabpanel"
        id={`panel-${props.activeTab}`}
        aria-labelledby={`tab-${props.activeTab}`}
        tabIndex={0}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Tabs;
