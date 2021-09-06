module.exports = {
  purge: ['./pages/**/*.ts}', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          '600': 'var(--gray-600)'
        }
      },
      gridTemplateColumns: {
        'main': 'minmax(0, 1fr) auto minmax(0, 1fr)',
        'full': '100%',
      },
      gridTemplateRows: {
        'main': 'minmax(0, 1fr) auto minmax(0, 1fr)',
        'full': '100%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
