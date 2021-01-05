import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React, { FC } from 'react';

export type UniVariant = 'MUNI' | 'PLZEN' | 'LIBEREC' | 'ZLIN';

const theme = {
	colors: {
		text: '#ffffff',
		textGrey: '#919191',
		textError: '#ffb5b5',
		textFocus: '#4688f1',
		bg: '#242424',
		bgGrey: '#292929',
		bgError: '#290000',
		bgWarn: '#332b00',
		bgHover: '#313131',
		bgSelected: '#000000',
		hover: '#192537',
		focus: '#0e639c',
		focusHover: '#1177bb',
		border: '#525252',
		borderError: '#5c0000',
		bordereWarn: '#665500',
		borderHover: '#858585',
	},
	breakpoints: ['40em', '52em', '64em', '76em'],
	fontSizes: { sm: 12, md: 16, lg: 20, xl: 24 },
	space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
	borderRadius: '4px',
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
