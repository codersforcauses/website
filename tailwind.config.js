module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
      mono: ['IBM Plex Mono', 'mono']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#01f1cc',
      success: '#0070f3',
      danger: '#ff0000',
      warning: '#f5a623',
      alt: {
        light: '#f5f5f5',
        dark: '#111111'
      }
    },
    extend: {
      keyframes: {
        slide: {
          '0%': { transform: 'translate3d(0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' }
        },
        wiggle: {
          '0%, 90%': { transform: 'translate3d(-1px,0,0)' },
          '20%, 80%': { transform: 'translate3d(2px,0,0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px,0,0)' },
          '40%, 60%': { transform: 'translate3d(4px,0,0)' }
        }
      },
      animation: {
        slide: 'slide 30s linear infinite',
        wiggle: 'wiggle 500ms cubic-bezier(.2,.8,.4,1) both'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
