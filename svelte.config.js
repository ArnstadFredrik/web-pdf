import adapter from "@sveltejs/adapter-netlify";

const config = {
  kit: {
    adapter: adapter(),
  },
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};

export default config;
