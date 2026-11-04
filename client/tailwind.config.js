/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#121212',
          card: '#1C1C1E',
          surface: '#161617',
          border: '#28282A',
          muted: '#8E8E93'
        },
        paper: {
          DEFAULT: '#F7F3EC',
          subtle: '#EFEAE1',
          dark: '#E2DBD0'
        },
        vermilion: {
          DEFAULT: '#C8362B',
          hover: '#AE2E24',
          light: '#F5483B',
          subtle: '#3A1815'
        },
        gold: {
          DEFAULT: '#B8923A',
          hover: '#A07E2F',
          light: '#D4AF5F',
          subtle: '#332915'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
