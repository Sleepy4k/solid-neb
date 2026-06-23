import { Component, For, Show, Suspense } from "solid-js";
import { Title, Meta, Link } from "@solidjs/meta";
import { cache, createAsync } from "@solidjs/router";
import { text } from "../constants/text";
import Container from "../components/Container";
import Button from "../components/Button";
import Accordion from "../components/Accordion";
import faqList from "../constants/faq-list";

const getFaqs = cache(async () => {
  "use server";
  return faqList;
}, "faqs");

const Home: Component = () => {
  const faqs = createAsync(() => getFaqs());

  const getFaqData = () => {
    const list = faqs() || [];
    return list.map((faq, index) => ({
      id: `faq-${index}`,
      question: faq.q,
      answer: faq.a,
    }));
  };

  return (
    <div>
      <Title>NEB - Naka Exam Bypasser | Free Safe Exam Browser Bypass Tool</Title>
      <Meta name="description" content="Bypass Safe Exam Browser, Kahoot, and Quizizz restrictions instantly. Upload your .seb config and get bypass headers in seconds — free, no login required." />
      <Meta name="keywords" content="naka exam bypasser, NEB, safe exam browser bypass, exam bypass tool, free exam bypasser, bypass seb, copy paste seb, screenshot seb, modheader seb" />
      <Meta name="author" content="NEB - Naka Exam Bypasser" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#ff4f00" />

      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:url" content="https://neb.benjamin4k.web.id" />
      <Meta property="og:title" content="NEB - Naka Exam Bypasser | Free Safe Exam Browser Bypass Tool" />
      <Meta property="og:description" content="Bypass Safe Exam Browser restrictions instantly. Upload your config file and get bypass headers — Request Hash, Config Key, Referer, User-Agent — ready for ModHeader." />
      <Meta property="og:image" content="https://neb.benjamin4k.web.id/src/assets/images/neb.png" />
      <Meta property="og:image:alt" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:image:width" content="512" />
      <Meta property="og:image:height" content="512" />
      <Meta property="og:locale" content="en_US" />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content="https://neb.benjamin4k.web.id" />
      <Meta name="twitter:title" content="NEB - Naka Exam Bypasser | Free Safe Exam Browser Bypass Tool" />
      <Meta name="twitter:description" content="Upload your .seb config and get instant bypass headers for Safe Exam Browser. Free and unlimited." />
      <Meta name="twitter:image" content="https://neb.benjamin4k.web.id/src/assets/images/neb.png" />

      <Link rel="canonical" href="https://neb.benjamin4k.web.id" />

      <section class="relative section-padding overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        <div class="absolute inset-0">
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        <Container>
          <div class="relative z-10 text-center max-w-3xl mx-auto">
            <div class="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span class="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                {text.hero.badge}
              </span>
              <span class="text-sm text-gray-600">{text.hero.badgeText}</span>
            </div>

            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {text.hero.title1}
              <br />
              <span class="text-primary-600">{text.hero.title2}</span>
            </h1>

            <p class="text-xl text-gray-600 mb-10 leading-relaxed">
              {text.hero.subtitle}
            </p>

            <div class="flex flex-wrap gap-4 justify-center mb-12">
              <Button
                href="/services"
                class="!bg-primary-600 hover:!bg-primary-700 !shadow-lg hover:!shadow-xl !transition-all cursor-pointer"
              >
                {text.hero.ctaPrimary}
                <svg
                  class="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
              <Button
                href="/tutorial"
                variant="outline"
                class="!bg-white !border-gray-300 !text-gray-700 hover:!bg-gray-50 !shadow-sm hover:!shadow !transition-all cursor-pointer"
              >
                {text.hero.ctaSecondary}
              </Button>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-medium text-gray-700">Instant & Safe</span>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span class="font-medium text-gray-700">24/7 Support</span>
              </div>
              <div class="flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                <span class="font-medium text-gray-700">Easy to Use</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section class="section-padding bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
                <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  {text.mainService.label}
                </span>
              </div>
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {text.mainService.title}
              </h2>
              <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                {text.mainService.description}
              </p>

              <div class="space-y-4 mb-8">
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      Upload Config File
                    </h4>
                    <p class="text-gray-500 text-sm">
                      Upload your .seb config file to the system
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      Get Bypass Access
                    </h4>
                    <p class="text-gray-500 text-sm">
                      System processes and provides instant bypass headers
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      Take Exam Freely
                    </h4>
                    <p class="text-gray-500 text-sm">
                      Use headers for full access without restrictions
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-4">
                <Button
                  href="/services/seb"
                  variant="accent"
                  class="!shadow-lg hover:!shadow-xl cursor-pointer"
                >
                  {text.mainService.cta}
                  <svg
                    class="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </Button>
                <Button href="/services" variant="outline" class="cursor-pointer">
                  {text.mainService.learnMore}
                  <svg
                    class="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            <div class="relative">
              <div class="feature-card card-base overflow-hidden shadow-xl">
                <div class="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg
                        class="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-white text-sm">
                        Safe Exam Browser
                      </h4>
                      <p class="text-white/80 text-xs">Bypass System</p>
                    </div>
                    <div class="px-2.5 py-1 bg-green-500/20 rounded-full">
                      <span class="text-xs font-semibold text-white">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div class="p-6 bg-white">
                  <div class="space-y-3">
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg
                        class="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span class="text-sm text-gray-700">
                        Full Browser Access
                      </span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg
                        class="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span class="text-sm text-gray-700">
                        Copy-Paste Enabled
                      </span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg
                        class="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span class="text-sm text-gray-700">
                        Multi-Tab Support
                      </span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg
                        class="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span class="text-sm text-gray-700">
                        Screenshot Allowed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="absolute -z-10 -top-6 -right-6 w-48 h-48 bg-primary-100 rounded-3xl opacity-50 blur-3xl"></div>
              <div class="absolute -z-10 -bottom-6 -left-6 w-48 h-48 bg-orange-100 rounded-3xl opacity-50 blur-3xl"></div>
            </div>
          </div>
        </Container>
      </section>

      <section class="py-12 border-y border-gray-100">
        <Container>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">
                {text.benefits.instant}
              </div>
              <div class="text-sm text-gray-500">
                {text.benefits.instantDesc}
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">
                {text.benefits.seamless}
              </div>
              <div class="text-sm text-gray-500">
                {text.benefits.seamlessDesc}
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">
                {text.benefits.secure}
              </div>
              <div class="text-sm text-gray-500">
                {text.benefits.secureDesc}
              </div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-900 mb-1">
                {text.benefits.available}
              </div>
              <div class="text-sm text-gray-500">
                {text.benefits.availableDesc}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section class="section-padding" id="faq">
        <Container>
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">
                {text.faq.title}
              </h2>
              <p class="text-xl text-gray-500">{text.faq.subtitle}</p>
            </div>

            <Suspense
              fallback={
                <div class="space-y-4">
                  <For each={[1, 2, 3, 4, 5]}>
                    {() => (
                      <div class="animate-pulse bg-white rounded-xl border border-gray-200 p-6">
                        <div class="flex items-start justify-between gap-4">
                          <div class="flex-1">
                            <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div class="h-4 bg-gray-100 rounded w-1/2"></div>
                          </div>
                          <div class="w-5 h-5 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              }
            >
              <Show when={getFaqData().length > 0}>
                <Accordion items={getFaqData()} defaultOpen="faq-0" />
              </Show>
            </Suspense>
          </div>
        </Container>
      </section>

      <section class="section-padding bg-gray-900">
        <Container>
          <div class="text-center">
            <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
              {text.cta.title}
            </h2>
            <p class="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              {text.cta.subtitle}
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <Button
                href="/services"
                class="!bg-primary-500 hover:!bg-primary-600 cursor-pointer"
              >
                {text.cta.primaryBtn}
                <svg
                  class="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
              <Button
                href="/contact"
                variant="outline"
                class="!border-gray-700 !text-white hover:!bg-gray-800 cursor-pointer"
              >
                {text.cta.secondaryBtn}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
