/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#3b82f6',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#ef4444',
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            pre: {
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
              borderRadius: '0',
            },
            blockquote: {
              borderLeftColor: '#3b82f6',
              backgroundColor: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#f3f4f6',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-lead': '#f3f4f6',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#f9fafb',
            '--tw-prose-counters': '#d1d5db',
            '--tw-prose-bullets': '#d1d5db',
            '--tw-prose-hr': '#374151',
            '--tw-prose-quotes': '#f3f4f6',
            '--tw-prose-quote-borders': '#3b82f6',
            '--tw-prose-captions': '#d1d5db',
            '--tw-prose-code': '#f87171',
            '--tw-prose-pre-code': '#f3f4f6',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': '#374151',
            '--tw-prose-td-borders': '#374151',
            code: {
              backgroundColor: '#1f2937',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
              border: '1px solid #374151',
            },
            blockquote: {
              backgroundColor: '#1f2937',
              borderLeftColor: '#3b82f6',
              color: '#f3f4f6',
            },
            hr: {
              borderColor: '#374151',
            },
            'ol > li::marker': {
              color: 'var(--tw-prose-counters)',
            },
            'ul > li::marker': {
              color: 'var(--tw-prose-bullets)',
            },
            strong: {
              color: 'var(--tw-prose-bold)',
            },
            thead: {
              color: 'var(--tw-prose-headings)',
            },
            'tbody tr': {
              borderBottomColor: 'var(--tw-prose-td-borders)',
            },
            blockquote: {
              color: 'var(--tw-prose-quotes)',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
            },
            h1: {
              color: 'var(--tw-prose-headings)',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
            },
            h5: {
              color: 'var(--tw-prose-headings)',
            },
            h6: {
              color: 'var(--tw-prose-headings)',
            },
            p: {
              color: 'var(--tw-prose-body)',
            },
            li: {
              color: 'var(--tw-prose-body)',
            },
            a: {
              color: 'var(--tw-prose-links)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};