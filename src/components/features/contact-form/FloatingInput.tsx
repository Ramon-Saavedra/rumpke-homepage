import { forwardRef } from 'react';
import { floatingInputBaseClasses, floatingLabelClasses } from './floatingClasses';

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ id, label, error, required, className, ...props }, ref) => (
    <div className="relative pb-1">
      <input
        ref={ref}
        id={id}
        placeholder=" "
        className={floatingInputBaseClasses(error, className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <label htmlFor={id} className={floatingLabelClasses(error)}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  ),
);

FloatingInput.displayName = 'FloatingInput';
export default FloatingInput;
