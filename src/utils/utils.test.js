import { describe, expect, it } from 'vitest';
import { truncateHtml } from '.';

describe('truncateHtml function', () => {
  it('should truncate text according to maxLength', () => {
    expect(truncateHtml('<p>Hello world</p>', 5)).toBe('Hello...');
  });
});
