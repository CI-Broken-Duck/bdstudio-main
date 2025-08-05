import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://www.brokenduckmedia.com",
  srcDir: "src",
  publicDir: "public",
  outDir: "dist",
  output: "static",                 // ✅ must be "static" for Firebase Hosting
  trailingSlash: "ignore",         // keeps routes clean and flexible

  server: {
    port: 4000
  },

  integrations: [react()]
});
