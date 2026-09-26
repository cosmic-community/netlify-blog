/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        netlify: {
          bg: '#0e1e25',
          bgAlt: '#111f27',
          teal: '#5cebdf',
          tealDark: '#32e6e2',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.netlify.teal'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray.400'),
            '--tw-prose-bullets': theme('colors.gray.600'),
            '--tw-prose-hr': theme('colors.gray.700'),
            '--tw-prose-quotes': theme('colors.gray.100'),
            '--tw-prose-quote-borders': theme('colors.netlify.teal'),
            '--tw-prose-captions': theme('colors.gray.400'),
            '--tw-prose-code': theme('colors.netlify.teal'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-th-borders': theme('colors.gray.700'),
            '--tw-prose-td-borders': theme('colors.gray.800'),
            code: {
              backgroundColor: theme('colors.gray.800'),
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '400',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}