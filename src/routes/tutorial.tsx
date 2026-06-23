import { Component, createSignal, Switch, Match } from "solid-js";
import { Title, Meta, Link } from "@solidjs/meta";
import { text } from "@constants/text";
import Tabs from "@components/Tabs";
import Container from "@components/Container";
import RenderSteps, { TutorialStep } from "@features/tutorial/RenderSteps";

import InstallStep1 from "@assets/images/tutorial/install-step1.png";
import InstallStep2 from "@assets/images/tutorial/install-step2.png";
import InstallStep3 from "@assets/images/tutorial/install-step3.png";
import RedeemStep1 from "@assets/images/tutorial/redeem-step1.png";
import RedeemStep2 from "@assets/images/tutorial/redeem-step2.png";
import RedeemStep3 from "@assets/images/tutorial/redeem-step3.png";
import RedeemStep4 from "@assets/images/tutorial/redeem-step4.png";
import UseStep1 from "@assets/images/tutorial/use-step1.png";
import UseStep2 from "@assets/images/tutorial/use-step2.png";
import UseStep3 from "@assets/images/tutorial/use-step3.png";

const Tutorial: Component = () => {
  const [activeTab, setActiveTab] = createSignal("install");

  const installSteps = (): TutorialStep[] => [
    {
      number: 1,
      text: text.tutorial.installStep1,
      image: InstallStep1,
      imageResolution: "32/9",
    },
    {
      number: 2,
      text: text.tutorial.installStep2,
      image: InstallStep2,
      imageResolution: "66/43",
    },
    {
      number: 3,
      text: text.tutorial.installStep3,
      image: InstallStep3,
      imageResolution: "2/1",
    },
  ];

  const redeemSteps = (): TutorialStep[] => [
    {
      number: 1,
      text: text.tutorial.redeemStep1,
      image: RedeemStep1,
      imageResolution: "2/1",
    },
    {
      number: 2,
      text: text.tutorial.redeemStep2,
      image: RedeemStep2,
      imageResolution: "1/1",
    },
    {
      number: 3,
      text: text.tutorial.redeemStep3,
      image: RedeemStep3,
      imageResolution: "1/1",
    },
    {
      number: 4,
      text: text.tutorial.redeemStep4,
      image: RedeemStep4,
      imageResolution: "4/1",
    },
  ];

  const useSteps = (): TutorialStep[] => [
    {
      number: 0,
      text: text.tutorial.useIntro,
    },
    {
      number: 1,
      text: text.tutorial.useStep1,
      image: UseStep1,
      imageResolution: "2/1",
    },
    {
      number: 2,
      text: text.tutorial.useStep2,
      image: UseStep2,
      imageResolution: "2/1",
    },
    {
      number: 3,
      text: text.tutorial.useStep3,
      image: UseStep3,
      imageResolution: "2/1",
    },
    {
      number: 0,
      text: text.tutorial.useFinal,
    },
  ];

  const tabs = () => [
    { key: "install", label: text.tutorial.installTab, value: "install" },
    { key: "redeem", label: text.tutorial.redeemTab, value: "redeem" },
    { key: "use", label: text.tutorial.useTab, value: "use" },
  ];

  return (
    <div>
      <Title>Tutorial Guide | NEB - Naka Exam Bypasser</Title>
      <Meta name="description" content="Step-by-step guide to install ModHeader, upload your .seb config, and bypass Safe Exam Browser. Complete walkthrough with screenshots." />
      <Meta name="keywords" content="safe exam browser bypass guide, modheader tutorial, install modheader extension, bypass online tests, seb config tutorial" />
      <Meta name="author" content="NEB - Naka Exam Bypasser" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#ff4f00" />

      <Meta property="og:type" content="article" />
      <Meta property="og:site_name" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:url" content="https://neb.benjamin4k.web.id/tutorial" />
      <Meta property="og:title" content="Tutorial Guide | NEB - Naka Exam Bypasser" />
      <Meta property="og:description" content="Complete guide with screenshots on how to install ModHeader and bypass Safe Exam Browser using NEB." />
      <Meta property="og:image" content="https://neb.benjamin4k.web.id/src/assets/images/neb.png" />
      <Meta property="og:image:alt" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:image:width" content="512" />
      <Meta property="og:image:height" content="512" />
      <Meta property="og:locale" content="en_US" />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content="https://neb.benjamin4k.web.id/tutorial" />
      <Meta name="twitter:title" content="Tutorial Guide | NEB - Naka Exam Bypasser" />
      <Meta name="twitter:description" content="Learn how to install ModHeader and load .seb config files to bypass exam browser restrictions." />
      <Meta name="twitter:image" content="https://neb.benjamin4k.web.id/src/assets/images/neb.png" />

      <Link rel="canonical" href="https://neb.benjamin4k.web.id/tutorial" />

      <section class="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <Container>
          <div class="max-w-3xl mx-auto text-center px-4">
            <div class="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 rounded-full mb-4">
              <svg
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span class="text-[10px] sm:text-xs font-semibold text-primary-600 uppercase tracking-wider">
                Tutorial Guide
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              {text.tutorial.title}
            </h1>
            <p class="text-base sm:text-lg text-gray-500 leading-relaxed">
              {text.tutorial.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section class="py-12 bg-white">
        <Container>
          <div class="max-w-4xl mx-auto">
            <Tabs
              tabs={tabs()}
              activeTab={activeTab()}
              onTabChange={setActiveTab}
            >
              <Switch>
                <Match when={activeTab() === "install"}>
                  <RenderSteps steps={installSteps()} note={text.tutorial.installNote} />
                </Match>
                <Match when={activeTab() === "redeem"}>
                  <RenderSteps steps={redeemSteps()} note={text.tutorial.redeemNote} />
                </Match>
                <Match when={activeTab() === "use"}>
                  <RenderSteps steps={useSteps()} note={text.tutorial.useNote} />
                </Match>
              </Switch>
            </Tabs>
          </div>
        </Container>
      </section>

      <section class="py-12 bg-gray-50">
        <Container>
          <div class="max-w-2xl mx-auto">
            <div class="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  class="w-8 h-8 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {text.tutorial.needHelp}
              </h3>
              <p class="text-gray-600 mb-6">{text.tutorial.needHelpDesc}</p>
              <a
                href="/contact"
                class="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                {text.tutorial.contactUs}
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Tutorial;
