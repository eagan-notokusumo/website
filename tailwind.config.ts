import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
			  accent: 'var(--color-accent)',
			  'accent-secondary': 'var(--color-accent-secondary)',
			  cream: 'var(--color-cream)',
			  gray: 'var(--color-gray)',
			  'light-gray': 'var(--color-light-gray)',
			  background: 'var(--color-background)',
			  text: 'var(--color-text)'
			},
			fontFamily: {
			  'space-grotesk': ['Space Grotesk', 'sans-serif'],
			  'inter': ['Inter', 'sans-serif']
			}
		  },
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
