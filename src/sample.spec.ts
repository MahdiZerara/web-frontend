import { expect } from '@jest/globals';

describe('sample unit tests', () => {
  it('my unit test', () => {
    expect.assertions(1);
    const x: number = 1;
    expect(x).toBe(1);
  });
});
