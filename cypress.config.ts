import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  e2e: {
    baseUrl: 'https://cat.nomoreparties.co',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    downloadsFolder: 'cypress/downloads',
  },
});
