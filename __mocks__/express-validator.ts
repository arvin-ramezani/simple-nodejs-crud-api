import { vi } from 'vitest';

export const validationResult = vi.fn(() => ({
  isEmpty: () => true,
  array: () => [],
}));
