import * as path from 'path'

import { defineConfig } from 'vite'
import minipic from 'vite-plugin-minipic'
import { presetDaisy } from 'unocss-preset-daisy'
import { presetUno } from 'unocss'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'

export default defineConfig({
	plugins: [
		react(),
		unocss({
			presets: [presetUno(), presetDaisy()],
			safelist: ['color-blue', 'color-violet', 'color-red'],
			theme: {
				breakpoints: {
					sm: '320px',
					md: '640px',
					lg: '960px',
					xl: '1280px',
				},
			},
		}),
		minipic({
			sharpOptions: {
				png: {
					quality: 70,
				},
			} as any,
			convert: [{ from: 'png', to: 'webp' }],
			cache: false,
			exclude: [],
			include: [],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
