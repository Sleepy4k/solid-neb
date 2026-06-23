import { Component } from "solid-js";
import { A } from "@solidjs/router";
import Container from "./Container";
import { text } from "../constants/text";
import Logo from "@assets/favicon.ico";

const Footer: Component = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-white border-t border-gray-100 py-12">
      <Container>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-1">
            <A href="/" class="text-xl font-bold text-gray-900 tracking-tight">
              <img src={Logo} alt="NEB Logo" class="w-16 h-10 inline-block -ms-2" loading="lazy" />
            </A>
            <p class="mt-3 text-sm text-gray-500 leading-relaxed">
              {text.footer.tagline}
            </p>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">
              {text.footer.product}
            </h4>
            <ul class="space-y-3">
              <li>
                <A
                  href="/services"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {text.nav.services}
                </A>
              </li>
              <li>
                <A
                  href="/tutorial"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {text.nav.tutorial}
                </A>
              </li>
              <li>
                <A
                  href="/#faq"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </A>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">
              {text.footer.company}
            </h4>
            <ul class="space-y-3">
              <li>
                <A
                  href="/contact"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {text.nav.contact}
                </A>
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {text.footer.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {text.footer.terms}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-gray-900 mb-4">
              {text.footer.connect}
            </h4>
            <ul class="space-y-3">
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@neb.com"
                  class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-100">
          <p class="text-sm text-gray-400 text-center">
            © {currentYear} NEB. {text.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
