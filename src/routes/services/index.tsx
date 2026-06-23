import { Component, For, Show, Suspense } from "solid-js";
import { Title, Meta, Link } from "@solidjs/meta";
import { cache, createAsync } from "@solidjs/router";
import { text } from "@constants/text";
import Container from "@components/Container";
import Badge from "@components/Badge";
import Button from "@components/Button";
import serviceList from "@constants/service-list";
import { toSlug } from "@lib/shared/utils.js";

const BASE_URL = "https://neb.benjamin4k.web.id";
const OG_IMAGE = `${BASE_URL}/src/assets/images/neb.png`;
const PAGE_TITLE = "Our Services | NEB - Naka Exam Bypasser";
const PAGE_URL = `${BASE_URL}/services`;
const PAGE_DESC =
  "Browse NEB's exam bypass services — Safe Exam Browser, Kahoot, and Quizizz bypasser tools. Free, instant, and easy to use.";

const getServices = cache(async () => {
  "use server";
  return serviceList.map((service) => ({
    ...service,
    slug: toSlug(service.name),
    description: !service.enabled
      ? { default: service.description.default }
      : service.description,
  }));
}, "services");

const Services: Component = () => {
  const services = createAsync(() => getServices());

  const getServiceIcon = (slug: string) => {
    const icons: Record<string, any> = {
      "safe-exam-bypasser": (
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      "kahoot-bypasser": (
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      "quizizz-bypasser": (
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    };
    return icons[slug] || icons["safe-exam-bypasser"];
  };

  const getServiceColor = (slug: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      "safe-exam-bypasser": { bg: "bg-primary-50", text: "text-primary-600", border: "border-primary-200" },
      "kahoot-bypasser": { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
      "quizizz-bypasser": { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
    };
    return colors[slug] || colors["safe-exam-bypasser"];
  };

  const getServiceHref = (slug: string) => {
    const hrefs: Record<string, string> = {
      "safe-exam-bypasser": "/services/seb",
    };
    return hrefs[slug] || "/services";
  };

  const sebFeatures = () => [
    {
      icon: (
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: text.services.feature1Title,
      description: text.services.feature1Desc,
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: text.services.feature2Title,
      description: text.services.feature2Desc,
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: text.services.feature3Title,
      description: text.services.feature3Desc,
    },
  ];

  return (
    <div>
      <Title>{PAGE_TITLE}</Title>
      <Meta name="description" content={PAGE_DESC} />
      <Meta name="keywords" content="safe exam browser bypasser, kahoot bypass, quizizz bypass, exam services, online exam bypasser, bypass exam lock, naka exam bypasser" />
      <Meta name="author" content="NEB - Naka Exam Bypasser" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#ff4f00" />

      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:url" content={PAGE_URL} />
      <Meta property="og:title" content={PAGE_TITLE} />
      <Meta property="og:description" content={PAGE_DESC} />
      <Meta property="og:image" content={OG_IMAGE} />
      <Meta property="og:image:alt" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:image:width" content="512" />
      <Meta property="og:image:height" content="512" />
      <Meta property="og:locale" content="en_US" />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content={PAGE_URL} />
      <Meta name="twitter:title" content={PAGE_TITLE} />
      <Meta name="twitter:description" content={PAGE_DESC} />
      <Meta name="twitter:image" content={OG_IMAGE} />

      <Link rel="canonical" href={PAGE_URL} />

      <section class="py-20 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-4xl mx-auto text-center mb-16">
            <Badge text="Naka Exam Bypasser" variant="accent" class="mb-4" />
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Services to Bypass Exams
            </h1>
            <p class="text-xl text-gray-500 leading-relaxed">
              NEB provides services to bypass online exams, making it easier for you to access
              exams without restrictions. Upload configs, gain access, and complete exams freely.
            </p>
          </div>

          <div class="max-w-5xl mx-auto">
            <Suspense
              fallback={
                <div class="grid md:grid-cols-3 gap-6">
                  <For each={[1, 2, 3]}>
                    {() => (
                      <div class="animate-pulse bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                        <div class="bg-gray-100 px-6 py-8">
                          <div class="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                          <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                          <div class="h-6 bg-gray-200 rounded-full w-24 mx-auto"></div>
                        </div>
                        <div class="p-6">
                          <div class="space-y-3 mb-6">
                            <div class="h-4 bg-gray-200 rounded w-full"></div>
                            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              }
            >
              <div class="grid md:grid-cols-3 gap-6">
                <For each={services() || []}>
                  {(service) => {
                    const colors = getServiceColor(service.slug);
                    return (
                      <div
                        class={`feature-card card-base overflow-hidden border-2 ${colors.border} ${service.enabled ? "shadow-lg hover:shadow-xl" : "opacity-75"} transition-all`}
                      >
                        <div class={`${colors.bg} px-6 py-8 text-center`}>
                          <div class={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 ${colors.text}`}>
                            {getServiceIcon(service.slug)}
                          </div>
                          <h3 class="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                          <Show
                            when={service.enabled}
                            fallback={<Badge text="Coming Soon" variant="subtle" />}
                          >
                            <Badge text="Available" variant="accent" />
                          </Show>
                        </div>

                        <div class="p-6">
                          <div class="space-y-3 mb-6">
                            <Show when={service.description?.default}>
                              <p class="text-sm text-gray-700 leading-relaxed font-medium">
                                {service.description.default}
                              </p>
                            </Show>
                            <Show
                              when={service.description?.seamless || service.description?.supported || service.description?.instant}
                            >
                              <div class="space-y-2 pt-3 border-t border-gray-100">
                                <Show when={service.description?.seamless}>
                                  <div class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p class="text-xs text-gray-600 leading-relaxed">{service.description.seamless}</p>
                                  </div>
                                </Show>
                                <Show when={service.description?.supported}>
                                  <div class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p class="text-xs text-gray-600 leading-relaxed">{service.description.supported}</p>
                                  </div>
                                </Show>
                                <Show when={service.description?.instant}>
                                  <div class="flex items-start gap-2">
                                    <svg class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p class="text-xs text-gray-600 leading-relaxed">{service.description.instant}</p>
                                  </div>
                                </Show>
                              </div>
                            </Show>
                          </div>

                          <Show
                            when={service.enabled}
                            fallback={
                              <button disabled class="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                                Not Available Yet
                              </button>
                            }
                          >
                            <Button
                              href={getServiceHref(service.slug)}
                              variant="accent"
                              class="w-full justify-center cursor-pointer"
                            >
                              Get Started
                              <svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Button>
                          </Show>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
            </Suspense>
          </div>
        </Container>
      </section>

      <section class="py-20 bg-white">
        <Container>
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
                <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">Featured Service</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Safe Exam Browser Bypass</h2>
              <p class="text-lg text-gray-500 max-w-2xl mx-auto">
                Bypass Safe Exam Browser restrictions instantly using our tools.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 mb-8">
              <For each={sebFeatures()}>
                {(feature) => (
                  <div class="feature-card card-base p-6 text-center hover:shadow-lg transition-shadow">
                    <div class="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                )}
              </For>
            </div>

            <div class="text-center mt-12">
              <Button href="/services/seb" variant="accent" class="!px-10 !py-5 !text-lg cursor-pointer">
                {text.services.ctaUpload}
                <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </Button>
              <p class="text-sm text-gray-500 mt-4">Upload config file and get instant bypass access</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Services;
