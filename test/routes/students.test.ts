import { expect, it } from 'vitest';

function sum(a: number, b: number) {
  return a + b;
}

it('should sum provided "a" and "b" arguments', () => {
  const sumValue = sum(1, 2);

  expect(sumValue).toBe(3);
});
