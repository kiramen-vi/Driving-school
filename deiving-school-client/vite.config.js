// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api to your backend on port 5000
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        // (optional) rewrite path if your backend mounts differently:
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
