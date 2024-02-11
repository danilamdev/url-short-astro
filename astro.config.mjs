import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), auth()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});