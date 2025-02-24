import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

const config: Config = {
  darkMode: ['class', 'class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*/**/*.{js,ts,jsx,tsx,mdx}', // Adjust for dynamic locale paths
  ],
  theme: {
    extend: {
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1820px',
      },
      fontSize: {
        xs: ['0.625rem', '0.875rem'],
        sm: ['0.75rem', '1rem'],
        md: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        lg: ['1.25rem', '1.75rem'],
        xl: ['1.5rem', '2rem'],
        '2xl': ['1.75rem', '2.25rem'],
        '3xl': ['2.25rem', '2.25rem'],
        '4xl': ['2.875rem', '2.25rem'],
        '5xl': ['3rem', '2.25rem'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#0044FF',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default withUt(config);
