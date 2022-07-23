import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$src: resolve(__dirname, 'src'),
		}
	}, 
	define: {
		'process.env': {}
	}
};

export default config;
