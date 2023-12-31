import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      darkblue: '#314CB6',
      blue: '#3970C3',
      lightblue: '#0A81D1',
      black: '#000000',
      gray: '#878787',
      lightgray: '#CACACA',
      green: '#7BC92D',
      lightgreen: '#6ED10A',
      yellow: '#FFD400',
      red: '#CA3D3D',
      lightred: '#cc5050',
      white: '#FFFFFF'
    }
  },
  plugins: [],
}
export default config
