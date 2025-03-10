import { defineConfig } from 'cypress';
import react from '@vitejs/plugin-react';

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3001',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // Use the Vite configuration without referencing webpack
      viteConfig: {
        plugins: [react()],
        server: {
          port: 3001,
          host: '127.0.0.1',
        }
      },
    },
    supportFile: 'cypress/support/component.ts',
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'cypress/support/component-index.html',
  },
});