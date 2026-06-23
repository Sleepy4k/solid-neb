import { Component, createSignal, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import Container from "./Container";
import Button from "./Button";
import { text } from "../constants/text";

const Logo = "https://neb.benjamin4k.web.id/src/assets/images/neb.png";

const Navbar: Component = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
  const location = useLocation();

  const navLinks = () => [
    { href: "/", label: text.nav.home },
    { href: "/services", label: text.nav.services },
    { href: "/tutorial", label: text.nav.tutorial },
    { href: "/contact", label: text.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <Container>
        <div class="flex items-center justify-between h-16">
          <A href="/" class="text-xl font-bold text-gray-900 tracking-tight">
            <img src={Logo} alt="Logo" class="h-8 w-auto" loading="lazy" />
          </A>

          <div class="hidden md:flex items-center gap-1">
            {navLinks().map((link) => (
              <A
                href={link.href}
                class={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive(link.href)
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </A>
            ))}
          </div>

          <div class="hidden md:flex items-center gap-3">
            <Button
              href="/services"
              variant="accent"
              class="!py-2 !px-4 text-sm"
            >
              {text.nav.startFree}
            </Button>
          </div>

          <button
            type="button"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
            aria-expanded={mobileMenuOpen()}
            aria-label="Toggle menu"
          >
            <Show
              when={!mobileMenuOpen()}
              fallback={
                <svg
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
            >
              <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Show>
          </button>
        </div>

        <Show when={mobileMenuOpen()}>
          <div class="md:hidden py-4 border-t border-gray-100">
            <div class="flex flex-col gap-1">
              {navLinks().map((link) => (
                <A
                  href={link.href}
                  class={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </A>
              ))}
              <div class="pt-4 px-4 flex flex-col gap-2 border-t border-gray-100">
                <Button href="/services" variant="accent" class="w-full">
                  {text.nav.startFree}
                </Button>
              </div>
            </div>
          </div>
        </Show>
      </Container>
    </nav>
  );
};

export default Navbar;
