import adapter from "@sveltejs/adapter-node";

const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $component: "/src/lib/components/",
      $js: "/src/lib/js/",
      $data: "/src/lib/data/data.svelte.js",
    },
  },
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};

export default config;
