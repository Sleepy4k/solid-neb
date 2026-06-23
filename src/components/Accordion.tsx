import { Component, For, createSignal } from 'solid-js';

interface AccordionProps {
  items: any[];
  defaultOpen?: string;
}

const Accordion: Component<AccordionProps> = (props) => {
  const [openId, setOpenId] = createSignal<string | null>(props.defaultOpen || null);

  const toggle = (id: string) => {
    setOpenId(current => current === id ? null : id);
  };

  const handleKeyDown = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <div class="space-y-3">
      <For each={props.items}>
        {(item) => {
          const isOpen = () => openId() === item.id;

          return (
            <div class={`rounded-2xl border transition-all duration-200 ${isOpen() ? 'border-gray-200 bg-white shadow-soft' : 'border-gray-100 bg-gray-50 hover:bg-white'}`}>
              <button
                type="button"
                id={`accordion-header-${item.id}`}
                aria-expanded={isOpen()}
                aria-controls={`accordion-panel-${item.id}`}
                class="w-full px-6 py-5 flex items-center justify-between text-left font-medium text-gray-900 transition-colors cursor-pointer focus:outline-none"
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
              >
                <span>{item.question}</span>
                <svg
                  class={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen() ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id={`accordion-panel-${item.id}`}
                role="region"
                aria-labelledby={`accordion-header-${item.id}`}
                class={`accordion-content ${isOpen() ? 'open' : ''}`}
              >
                <div>
                  <div class="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default Accordion;
