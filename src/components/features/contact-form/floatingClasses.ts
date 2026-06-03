import { cn } from '@/lib/utils';

export function floatingInputBaseClasses(error?: string, extra?: string): string {
  return cn(
    'peer w-full bg-transparent border-b pb-1 pt-4 text-sm mb-1',
    'placeholder-transparent focus:outline-none',
    error
      ? 'border-error'
      : 'border-border-l dark:border-border-d focus:border-primary',
    extra,
  );
}

export function floatingLabelClasses(error?: string): string {
  return cn(
    'absolute left-0 pointer-events-none select-none',
    'top-0 text-xs font-semibold',
    error ? 'text-error' : 'text-primary',
    'peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal',
    error
      ? 'peer-placeholder-shown:text-error/70'
      : 'peer-placeholder-shown:text-card-text-l dark:peer-placeholder-shown:text-card-text-d',
    'peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold',
    error ? 'peer-focus:text-error' : 'peer-focus:text-primary',
  );
}
