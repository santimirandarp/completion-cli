/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'node',
    reporters: ['verbose'],
    silent: false,
    globals: true,
  },
});
