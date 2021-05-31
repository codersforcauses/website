module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
      mono: ['IBM Plex Mono', 'mono']
    },
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#01f1cc',
        success: '#0070f3',
        danger: '#ff0000',
        warning: '#f5a623',
        alt: {
          light: '#f8f9fa',
          dark: '#111111'
        }
      }
    }
  },
  variants: {
    extend: {
      filter: ['hover']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
