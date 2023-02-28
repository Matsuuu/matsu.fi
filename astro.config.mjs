import { defineConfig } from 'astro/config';

// https://astro.build/config
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
    //    base: "/matsu.fi",
  integrations: [lit()]
});
