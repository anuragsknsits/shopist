export default function Button({ type = 'button', busy = false, disabled, className = '', children, ...props }) {
  return <button {...props} type={type} disabled={disabled || busy} aria-busy={busy || undefined} className={`ui-button ${className}`}>{children}</button>;
}
