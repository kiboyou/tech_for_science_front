import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        edu: {
          primary: 'rgb(var(--edu-primary) / <alpha-value>)',
          primaryFg: 'rgb(var(--edu-primary-fg) / <alpha-value>)',
          heading: 'rgb(var(--edu-heading) / <alpha-value>)',
          body: 'rgb(var(--edu-body) / <alpha-value>)',
          muted: 'rgb(var(--edu-muted) / <alpha-value>)',
          accent: 'rgb(var(--edu-accent) / <alpha-value>)',
        },
        brand: {
          cyan: '#22d3ee',
          fuchsia: '#f472b6',
          violet: '#a78bfa',
        }
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2rem'
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0,0,0,0.35)',
        innerSoft: 'inset 0 1px 0 rgba(255,255,255,0.05)'
      }
    }
  },
  plugins: []
} satisfies Config
