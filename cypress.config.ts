import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1500,
    viewportHeight: 1000,
    baseUrl: 'http://localhost:3000',
  }
});
