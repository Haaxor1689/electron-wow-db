import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { FC } from 'react';

export type UniVariant = 'MUNI' | 'PLZEN' | 'LIBEREC' | 'ZLIN';

const theme = {
	colors: {
		primary: '#01ABA2',
		secondary: '#1E2838',
		text: '#ebebeb',
	},
	breakpoints: ['40em', '52em', '64em', '76em'],
	fontSizes: { sm: 14, md: 16, lg: 20, xl: 28 },
	space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

type ThemeType = typeof theme;

declare module '@emotion/react' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
	export interface Theme extends ThemeType {}
}

export const ThemeProvider: FC = ({ children }) => (
	<EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
);

export { default as GlobalStyles } from './GlobalStyles';
