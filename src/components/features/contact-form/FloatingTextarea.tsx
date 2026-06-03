import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { floatingInputBaseClasses, floatingLabelClasses } from './floatingClasses';

export interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  charCount?: { current: number; max: number };
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ id, label, error, required, charCount, className, ...props }, ref) => (
    <div className="relative pb-1">
      <textarea
        ref={ref}
        id={id}
        placeholder=" "
        className={cn(floatingInputBaseClasses(error, className), 'resize-none')}
        aria-invalid={!!error}
        aria-describedby={
          [error ? `${id}-error` : null, charCount ? `${id}-count` : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        {...props}
      />
      <label htmlFor={id} className={floatingLabelClasses(error)}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="flex justify-between items-center min-h-4">
        {error && (
          <p id={`${id}-error`} role="alert" className="text-xs text-error">
            {error}
          </p>
        )}
        {charCount && (
          <p
            id={`${id}-count`}
            className={cn(
              'text-xs ml-auto tabular-nums',
              charCount.current >= charCount.max
                ? 'text-error'
                : charCount.current > charCount.max * 0.9
                  ? 'text-warning'
                  : 'text-card-text-l dark:text-card-text-d',
            )}
            aria-live="polite"
          >
            {charCount.current}/{charCount.max}
          </p>
        )}
      </div>
    </div>
  ),
);

FloatingTextarea.displayName = 'FloatingTextarea';
export default FloatingTextarea;
