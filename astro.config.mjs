import { defineConfig } from 'astro/config';
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
    base: "/matsu.fi",
    integrations: [lit()],
    markdown: {
        shikiConfig: {
            theme: 'github-dark'
        }
    },
  integrations: [lit()]
});
