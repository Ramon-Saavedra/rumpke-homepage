import { cn } from './utils';

describe('cn', () => {
  it('merges two class strings', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('deduplicates conflicting tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles conditional falsy classes', () => {
    expect(cn('base', false && 'skip', 'added')).toBe('base added');
  });

  it('handles undefined values', () => {
    expect(cn('a', undefined, 'b')).toBe('a b');
  });

  it('returns empty string with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('handles array of classes', () => {
    expect(cn(['a', 'b'])).toBe('a b');
  });
});
