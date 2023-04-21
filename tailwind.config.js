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
  ]
}
