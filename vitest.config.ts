import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },

  test: {
    mockReset: true,
    environment: 'node',
    setupFiles: ['./setup-test.ts'],
  },
});
