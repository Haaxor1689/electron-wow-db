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
				background-color: ${theme.colors.bg};
			}

			* {
				font-family: Calibri, sans-serif;
				border: 0 solid ${theme.colors.border};
			}

			p {
				padding: 0;
				margin: ${theme.space[2]}px 0;
			}

			p,
			span {
				font-size: ${theme.fontSizes.md}px;
			}

			input {
				min-width: 0;
			}

			svg {
				display: block;
			}
		`}
	/>
);

export default GlobalStyles;
