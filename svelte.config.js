import adapter from "@sveltejs/adapter-node";
import adapterStatic from "@sveltejs/adapter-static";

// ADAPTER=static gir en ren SPA-build (brukes av Electron-appen).
// Uten den bygges som før med adapter-node (Docker/server).
const useStatic = process.env.ADAPTER === "static";

const config = {
  kit: {
    adapter: useStatic
      ? adapterStatic({ fallback: "index.html" })
      : adapter(),
    paths: useStatic ? { relative: true } : undefined,
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
