/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Deliberately NOT extending Tailwind's default palette/spacing/radius.
    // Everything below maps to CSS custom properties defined in
    // src/styles/tokens.css, which is the single source of truth.
    // A component reaching for `bg-red-500` or `p-7` (outside this scale)
    // is a contract violation, not a style choice.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      surface: {
        primary: 'var(--color-surface-primary)',
        secondary: 'var(--color-surface-secondary)',
      },
      text: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        hover: 'var(--color-accent-hover)',
      },
      border: 'var(--color-border)',
      danger: 'var(--color-danger)',
    },
    spacing: {
      0: '0',
      xs: 'var(--space-xs)',
      s: 'var(--space-s)',
      m: 'var(--space-m)',
      l: 'var(--space-l)',
      xl: 'var(--space-xl)',
      '2xl': 'var(--space-2xl)',
    },
    borderRadius: {
      none: '0',
      s: 'var(--radius-s)',
      full: '9999px',
    },
    boxShadow: {
      none: 'none',
      card: 'var(--shadow-card)',
    },
    fontFamily: {
      display: 'var(--font-display)',
      body: 'var(--font-body)',
    },
    fontSize: {
      xs: 'var(--text-xs)',
      s: 'var(--text-s)',
      m: 'var(--text-m)',
      l: 'var(--text-l)',
      xl: 'var(--text-xl)',
      '2xl': 'var(--text-2xl)',
    },
    transitionDuration: {
      DEFAULT: 'var(--motion-duration)',
    },
    transitionTimingFunction: {
      DEFAULT: 'var(--motion-easing)',
    },
    extend: {
      maxWidth: {
        content: 'var(--max-content-width)',
      },
    },
  },
  plugins: [],
};
