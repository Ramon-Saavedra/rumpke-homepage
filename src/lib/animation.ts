export function fadeUp(visible: boolean): string {
  return `motion-safe:transition-[opacity,transform] motion-safe:ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;
}

export function staggerDelay(
  visible: boolean,
  baseMs: number,
  stepMs = 0,
  index = 0,
): string {
  return visible ? `${baseMs + index * stepMs}ms` : "0ms";
}
