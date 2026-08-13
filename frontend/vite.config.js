import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: import.meta.env.VITE_MODE === "production",
      },
    },
  },
});
