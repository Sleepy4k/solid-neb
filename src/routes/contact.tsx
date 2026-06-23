import { Component, createSignal, Show } from "solid-js";
import { Title, Meta, Link } from "@solidjs/meta";
import { action, useSubmission, useSearchParams } from "@solidjs/router";
import { text } from "@constants/text";
import Container from "@components/Container";
import Button from "@components/Button";
import { submitContactAction } from "@server/action/contact.action.js";

export const submitContact = action(submitContactAction, "submitContact");

const Contact: Component = () => {
  const submission = useSubmission(submitContact);
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = createSignal({
    name: "",
    email: "",
    message: "",
  });

  const [clientErrors, setClientErrors] = createSignal<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInput = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (clientErrors()[field]) {
      setClientErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e: SubmitEvent) => {
    const data = formData();
    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) {
      newErrors.name = text.contact.nameError;
    }
    if (!data.email.trim()) {
      newErrors.email = text.contact.emailError;
    } else if (!validateEmail(data.email)) {
      newErrors.email = text.contact.emailInvalid;
    }
    if (!data.message.trim()) {
      newErrors.message = text.contact.messageError;
    } else if (data.message.trim().length < 10) {
      newErrors.message = text.contact.messageMinLength;
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setClientErrors(newErrors);
    }
  };

  const isSuccess = () => searchParams.success === "true";

  return (
    <div>
      <Title>Contact Us | NEB - Naka Exam Bypasser</Title>
      <Meta name="description" content="Get in touch with the NEB team. Send questions, report bugs, or request features related to Safe Exam Browser bypass tools." />
      <Meta name="keywords" content="contact NEB, safe exam bypasser support, bug report, technical help, exam bypass support" />
      <Meta name="author" content="NEB - Naka Exam Bypasser" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#ff4f00" />

      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:url" content="https://neb.benjamin4k.web.id/contact" />
      <Meta property="og:title" content="Contact Us | NEB - Naka Exam Bypasser" />
      <Meta property="og:description" content="Get in touch with the NEB team for any inquiries, technical issues, or feature requests." />
      <Meta property="og:image" content="https://neb.benjamin4k.web.id/src/assets/images/neb.png" />
      <Meta property="og:image:alt" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:image:width" content="512" />
      <Meta property="og:image:height" content="512" />
      <Meta property="og:locale" content="en_US" />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content="https://neb.benjamin4k.web.id/contact" />
      <Meta name="twitter:title" content="Contact Us | NEB - Naka Exam Bypasser" />
      <Meta name="twitter:description" content="Need help with Safe Exam Browser bypass? Contact the NEB team." />
      <Meta name="twitter:image" content="https://neb.benjamin4k.web.id/src/assets/images/neb.png" />

      <Link rel="canonical" href="https://neb.benjamin4k.web.id/contact" />

      <section class="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-3xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
              <svg
                class="w-4 h-4 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 0-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                Contact Us
              </span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {text.contact.title}
            </h1>
            <p class="text-lg text-gray-500">{text.contact.subtitle}</p>
          </div>
        </Container>
      </section>

      <section class="py-12 bg-white">
        <Container>
          <div class="max-w-2xl mx-auto">
            <Show when={isSuccess()}>
              <div class="mb-6 p-5 bg-green-50 border border-green-200 rounded-xl">
                <div class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 class="text-base font-semibold text-green-900 mb-1">
                      Success!
                    </h3>
                    <p class="text-green-700 text-sm">{text.contact.successMessage}</p>
                  </div>
                </div>
              </div>
            </Show>

            <Show when={submission.result?.error}>
              <div class="mb-6 p-5 bg-red-50 border border-red-200 rounded-xl">
                <div class="flex items-start gap-3">
                  <svg
                    class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 class="text-base font-semibold text-red-900 mb-1">
                      Error
                    </h3>
                    <p class="text-red-700 text-sm">{submission.result.error}</p>
                  </div>
                </div>
              </div>
            </Show>

            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {text.contact.formTitle}
              </h2>

              <form
                action={submitContact}
                method="post"
                onSubmit={handleSubmit}
                class="space-y-5"
              >
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {text.contact.nameLabel} <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData().name}
                    onInput={(e) => handleInput("name", e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors
                      ${clientErrors().name ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-primary-500"}`}
                    placeholder={text.contact.namePlaceholder}
                    disabled={submission.pending}
                  />
                  <Show when={clientErrors().name}>
                    <p class="mt-1.5 text-sm text-red-600">{clientErrors().name}</p>
                  </Show>
                </div>

                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {text.contact.emailLabel} <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData().email}
                    onInput={(e) => handleInput("email", e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors
                      ${clientErrors().email ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-primary-500"}`}
                    placeholder={text.contact.emailPlaceholder}
                    disabled={submission.pending}
                  />
                  <Show when={clientErrors().email}>
                    <p class="mt-1.5 text-sm text-red-600">{clientErrors().email}</p>
                  </Show>
                </div>

                <div>
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {text.contact.messageLabel} <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData().message}
                    onInput={(e) => handleInput("message", e.currentTarget.value)}
                    class={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none
                      ${clientErrors().message ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-primary-500"}`}
                    placeholder={text.contact.messagePlaceholder}
                    disabled={submission.pending}
                  />
                  <Show when={clientErrors().message}>
                    <p class="mt-1.5 text-sm text-red-600">{clientErrors().message}</p>
                  </Show>
                  <p class="mt-1.5 text-xs text-gray-500">
                    Minimum 10 characters
                  </p>
                </div>

                <div class="pt-2">
                  <Button
                    type="submit"
                    variant="accent"
                    class="w-full !py-3 !text-base !font-semibold cursor-pointer"
                    disabled={submission.pending}
                  >
                    <Show
                      when={submission.pending}
                      fallback={
                        <>
                          {text.contact.submitBtn}
                          <svg
                            class="ml-2 w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      }
                    >
                      <svg
                        class="animate-spin w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        />
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {text.contact.submitting}
                    </Show>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
