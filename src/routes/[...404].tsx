import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { Title, Meta, Link } from "@solidjs/meta";

const NotFound: Component = () => {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 relative overflow-hidden">
      <Title>404 Page Not Found | NEB - Naka Exam Bypasser</Title>
      <Meta name="robots" content="noindex, nofollow" />

      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative z-10 text-center max-w-2xl">
        <div class="mb-8">
          <div class="relative inline-block">
            <h1 class="text-9xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 animate-pulse-slow drop-shadow-2xl">
              404
            </h1>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">
              🔍
            </div>
          </div>
        </div>

        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>

        <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for could not be found. It may have
          been moved or never existed.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <A
            href="/"
            class="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl overflow-hidden shadow-lg shadow-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/30 transform hover:scale-105 transition-all duration-300"
          >
            <span class="relative z-10 flex items-center gap-2">
              <svg
                class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </span>
          </A>

          <button
            onClick={() => window.history.back()}
            class="inline-flex items-center justify-center px-8 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 hover:text-gray-900 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
              />
            </svg>
            Previous Page
          </button>
        </div>

        <div class="text-sm text-gray-600">
          <p class="mb-3">Or visit the following pages:</p>
          <div class="flex flex-wrap gap-4 justify-center">
            <A
              href="/"
              class="hover:text-primary-400 transition-colors underline decoration-primary-500/0 hover:decoration-primary-400 underline-offset-4"
            >
              Home
            </A>
            <A
              href="/services"
              class="hover:text-primary-400 transition-colors underline decoration-primary-500/0 hover:decoration-primary-400 underline-offset-4"
            >
              Services
            </A>
            <A
              href="/tutorial"
              class="hover:text-primary-400 transition-colors underline decoration-primary-500/0 hover:decoration-primary-400 underline-offset-4"
            >
              Tutorial
            </A>
            <A
              href="/contact"
              class="hover:text-primary-400 transition-colors underline decoration-primary-500/0 hover:decoration-primary-400 underline-offset-4"
            >
              Contact
            </A>
          </div>
        </div>
      </div>

      <div class="absolute bottom-10 left-0 right-0 text-center text-xs text-gray-400 pointer-events-none">
        <p>Error Code: 404 | Page Not Found</p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
