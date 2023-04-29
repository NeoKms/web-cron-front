module.exports = {
  theme: {},
  plugins: [
    require('@tailwindcss/forms')
  ],
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}'
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|indigo|yellow|orange)-(500|600)/,
      variants: ['hover']
    },
    {
      pattern: /outline-(red|green|blue|indigo|yellow|orange)-600/,
      variants: ['focus-visible']
    },
    'bg-gray-600'
  ]
};
