module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
      mono: ['IBM Plex Mono', 'mono']
    },
    colors: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#01f1cc',
      success: '#0070f3',
      danger: '#ff0000',
      warning: '#f5a623',
      alt: {
        light: '#e9ecef',
        dark: '#111111'
      }
    },
    extend: {
      minWidth: {
        '1/2': '50%'
      },
      minHeight: {
        '1/2': '50%'
      },
      zIndex: {
        5: 5,
        15: 15,
        25: 25,
        35: 35,
        45: 45
      }
    }
  },
  variants: {
    extend: {
      filter: ['hover'],
      margin: ['last']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
