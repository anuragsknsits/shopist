import { forwardRef, useId } from 'react';

const FormField = forwardRef(function FormField({ label, error, hint, id, as: Control = 'input', className = '', ...props }, ref) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const description = [props['aria-describedby'], hint && `${fieldId}-hint`, error && `${fieldId}-error`].filter(Boolean).join(' ') || undefined;
  return <div className="min-w-0 space-y-1">
    <label htmlFor={fieldId} className="block font-medium text-gray-700">{label}</label>
    <Control {...props} ref={ref} id={fieldId} aria-invalid={error ? true : undefined} aria-describedby={description} className={`ui-input ${className}`} />
    {hint && <p id={`${fieldId}-hint`} className="text-sm text-gray-600">{hint}</p>}
    {error && <p id={`${fieldId}-error`} role="alert" className="text-sm text-red-700">{error}</p>}
  </div>;
});
export default FormField;
