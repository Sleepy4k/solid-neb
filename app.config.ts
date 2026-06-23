import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": resolve(__dirname, "./src"),
        "@assets": resolve(__dirname, "./src/assets"),
        "@components": resolve(__dirname, "./src/components"),
        "@config": resolve(__dirname, "./src/config"),
        "@constants": resolve(__dirname, "./src/constants"),
        "@features": resolve(__dirname, "./src/features"),
        "@layouts": resolve(__dirname, "./src/layouts"),
        "@lib": resolve(__dirname, "./src/lib"),
        "@server": resolve(__dirname, "./src/server"),
      },
    },
  }
});
