import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BoxProps, ComposeBox } from './Styled';

type Props = { selected?: boolean } & BoxProps;

const TextButton = styled('button')<Props>`
	${ComposeBox()}
	color: ${(p) => p.theme.colors.text};
	background-color: ${(p) => p.theme.colors.bg};
	border-radius: ${(p) => p.theme.borderRadius};
	text-decoration: underline;

	:hover {
		background-color: ${(p) => p.theme.colors.bgHover};
	}

	${(p) =>
		p.selected &&
		css`
			border-color: ${p.theme.colors.focus};
			border-width: 1px;
		`}
`;
TextButton.defaultProps = {
	type: 'button',
	py: 2,
	fontSize: 'md',
};
export default TextButton;
