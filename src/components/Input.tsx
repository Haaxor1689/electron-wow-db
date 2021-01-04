import styled from '@emotion/styled';
import { BoxProps, ComposeBox } from './Styled';

const Input = styled.input<BoxProps>`
	${ComposeBox()}
	border-width: 1px;
	background-color: ${(p) => p.theme.colors.bg};
	color: ${(p) => p.theme.colors.text};
	:hover {
		border-color: ${(p) => p.theme.colors.borderHover};
	}
`;
export default Input;

export const Select = styled.select<BoxProps>`
	${ComposeBox()}
	border-width: 1px;
	background-color: ${(p) => p.theme.colors.bg};
	color: ${(p) => p.theme.colors.text};
	:hover {
		border-color: ${(p) => p.theme.colors.borderHover};
	}
`;
