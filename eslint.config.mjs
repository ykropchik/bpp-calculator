import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';

const stylisticConfig = stylistic.configs.customize({
	indent: 'tab',
	quotes: 'single',
	braceStyle: '1tbs',
	commaDangle: 'always-multiline',
	quoteProps: 'as-needed',
	arrowParens: true,
	blockSpacing: true,
	semi: true,
	jsx: true,
});

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			pluginReact.configs.flat.recommended,
			stylisticConfig,
		],
		languageOptions: { globals: globals.browser },
		rules: {
			'@typescript-eslint/consistent-type-imports': 'error',
		},
	},
]);
