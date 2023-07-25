/// <reference types="vitest" />
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	cacheDir: '../node_modules/.vite/server',
	base: '/',

	plugins: [
		viteTsConfigPaths({
			root: '../',
		}),
	],

	test: {
		globals: true,
		cache: {
			dir: '../node_modules/.vitest',
		},
		environment: 'jsdom',
		include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		coverage: {
			enabled: true,
			include: ['**/src/**'],
			exclude: [
				'**/lib/**',
				'**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
				'**/migrate/migrations/**',
				'**/tables/*.ts',
				'**/wordlist/managed/lists/**',
			],
			reporter: ['json-summary', 'json', 'html'],
		},
		reporters: ['default', 'junit'],
		outputFile: {
			junit: '../coverage/scuba-server/junit.xml',
		},
	},
})
