import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BoxProps, ComposeBox } from './Styled';

type Props = {
	active?: boolean;
} & BoxProps;

const TabButton = styled.button<Props>`
	${ComposeBox()}
	color: ${(p) => p.theme.colors.text};
	background-color: ${(p) => p.theme.colors.bg};
	border-top-left-radius: ${(p) => p.theme.borderRadius};
	border-top-right-radius: ${(p) => p.theme.borderRadius};
	border-width: 1px 1px 0 1px;

	:hover {
		background-color: ${(p) => p.theme.colors.bgHover};
		border-color: ${(p) => p.theme.colors.borderHover};
	}

	${(p) =>
		p.active &&
		css`
			background-color: ${p.theme.colors.bgSelected};
			:hover {
				background-color: ${p.theme.colors.hover};
			}
		`}
`;
TabButton.defaultProps = {
	type: 'button',
	px: 3,
	py: 2,
	fontSize: 'md',
};
export default TabButton;
