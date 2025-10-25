import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      fontFamily: {
        rubik: ['var(--font-rubik)', 'sans-serif'],
      },
    },
  },
} satisfies Config;
