import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BoxProps, ComposeBox } from './Styled';

type Props = {
	variant?: 'primary';
} & BoxProps;

const Button = styled('button')<Props>`
	${ComposeBox()}
	color: ${(p) => p.theme.colors.text};
	background-color: ${(p) => p.theme.colors.bg};
	border-width: 1px;
	border-radius: ${(p) => p.theme.borderRagius};

	:hover {
		background-color: ${(p) => p.theme.colors.bgHover};
		border-color: ${(p) => p.theme.colors.borderHover};
	}
	${(p) =>
		p.variant === 'primary' &&
		css`
			background-color: ${p.theme.colors.focus};
			border-width: 0;
			:hover {
				background-color: ${p.theme.colors.focusHover};
			}
		`}
`;
Button.defaultProps = {
	type: 'button',
	px: 3,
	py: 2,
	fontSize: 'md',
};
export default Button;
