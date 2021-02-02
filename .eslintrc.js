module.exports = {
	extends: 'erb',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		createDefaultProgram: true,
	},
	rules: {
		// A temporary hack related to IDE not resolving correct package.json
		'import/no-extraneous-dependencies': 'off',
		curly: 'error',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/prefer-optional-chain': 'error',
		'@typescript-eslint/prefer-nullish-coalescing': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'no-console': 'off',
		'no-nested-ternary': 'off',
		'promise/always-return': 'off',
		'react/no-array-index-key': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-fragments': 'off',
		'react/require-default-props': 'off',
		'no-bitwise': 'off',
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	settings: {
		'import/resolver': {
			// See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
			node: {},
			webpack: {
				config: require.resolve('./.erb/configs/webpack.config.eslint.js'),
			},
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
	},
	overrides: [
		{
			files: ['**/*.tsx'],
			rules: {
				'react/prop-types': 'off',
			},
		},
	],
};
