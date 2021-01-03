import React from 'react';
import { Global, css, Theme } from '@emotion/react';

const GlobalStyles = () => (
	<Global
		styles={(theme: Theme) => css`
			body {
				margin: 0;
				font-family: Roboto, sans-serif;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				color: ${theme.colors.text};
			}

			* {
				font-family: Roboto, sans-serif;
			}

			p {
				padding: 0;
				margin: ${theme.space[2]}px 0;
			}

			input {
				min-width: 0;
			}
		`}
	/>
);

export default GlobalStyles;
