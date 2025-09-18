// Centralised design tokens & helpers
export const DS = {
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    pill: '999px'
  },
  shadow: {
    light: '0 2px 4px -2px rgba(15,23,42,0.06), 0 4px 12px -2px rgba(15,23,42,0.05)',
    medium: '0 4px 16px -4px rgba(15,23,42,0.12), 0 8px 28px -6px rgba(15,23,42,0.10)',
    glass: '0 4px 24px -6px rgba(15,23,42,0.25)',
    inner: 'inset 0 1px 0 rgba(255,255,255,0.1)'
  },
  motion: {
    fast: '120ms',
    base: '180ms',
    slow: '320ms',
    easing: 'cubic-bezier(0.22, 0.8, 0.36, 1)'
  }
};

export const cls = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');
