/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'parallax': 'url("../parallax.jpg")',
        'parallax2': 'url("../parallax2.jpg")',
      },
      colors: {
        stone900: '#292524',
        customBone: '#e9e9e3',
        stone950: '#0c0a09',
        neutral300: '#d4d4d4',
        neutral100: '#f5f5f5',
        neutral400: '#a3a3a3',
        slate50: '#f8fafc',
        slate300: '#cbd5e1',
        slate500: '#64748b',
        slate950: '#020617',
        gray500: '#6b7280',
        gray300: '#d1d5db',
        customBone2: '#D1D1C4',
        customBone3: '#8A8A76',
        customBone4: '#D0D0BD'
      },
      screens: {
        'sm': '670px'
      }
    },

  },
  plugins: [],
}

