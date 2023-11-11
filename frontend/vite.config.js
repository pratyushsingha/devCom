import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === 'production';

// Set the default target for development
let apiTarget = "http://localhost:3000";

// Override the target for production
if (isProduction) {
  apiTarget = "https://devcombackend.onrender.com";
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiTarget,
      },
    },
  },
});
