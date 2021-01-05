import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BoxProps, ComposeBox } from './Styled';

type Props = {
	active?: boolean;
} & BoxProps;

const Chip = styled.div<Props>`
	${ComposeBox()}
	background-color: ${(p) => p.theme.colors.bg};
	border-width: 1px;
	border-radius: ${(p) => p.theme.borderRadius};

	:hover {
		background-color: ${(p) => p.theme.colors.bgHover};
		border-color: ${(p) => p.theme.colors.borderHover};
	}

	${(p) =>
		p.active &&
		css`
			background-color: ${p.theme.colors.focus};
			border-width: 0;
			:hover {
				background-color: ${p.theme.colors.focusHover};
			}
		`}
`;
Chip.defaultProps = {
	px: 1,
};

export default Chip;
