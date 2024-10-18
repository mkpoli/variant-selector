import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        jigmo: ['Jigmo', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
} as Config;
