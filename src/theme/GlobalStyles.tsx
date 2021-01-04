import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
	<Global
		styles={(theme) => css`
			body {
				margin: 0;
				font-family: Calibri, sans-serif;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				color: ${theme.colors.text};
			}

			* {
				font-family: Calibri, sans-serif;
				font-size: ${theme.fontSizes.md}px;

				border: 0 solid ${theme.colors.border};
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
