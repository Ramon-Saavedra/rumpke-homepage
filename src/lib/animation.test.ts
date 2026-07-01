import { fadeUp } from './animation';

describe('fadeUp', () => {
  it('returns visible classes when visible is true', () => {
    const result = fadeUp(true);
    expect(result).toContain('opacity-100');
    expect(result).toContain('translate-y-0');
  });

  it('returns hidden classes when visible is false', () => {
    const result = fadeUp(false);
    expect(result).toContain('opacity-0');
    expect(result).toContain('translate-y-10');
  });

  it('always includes transition classes', () => {
    expect(fadeUp(true)).toContain('transition-[opacity,transform]');
    expect(fadeUp(false)).toContain('transition-[opacity,transform]');
  });

  it('always includes ease-out', () => {
    expect(fadeUp(true)).toContain('ease-out');
    expect(fadeUp(false)).toContain('ease-out');
  });

  it('visible and hidden states are mutually exclusive', () => {
    expect(fadeUp(true)).not.toContain('opacity-0');
    expect(fadeUp(false)).not.toContain('opacity-100');
  });
});
