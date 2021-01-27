import styled from '@emotion/styled';
import { BoxProps, ComposeBox } from './Styled';

type Props = BoxProps;

const IconButton = styled.button<Props>`
	${ComposeBox()}
	background: transparent;

	:hover {
		color: ${(p) => p.theme.colors.textFocus};
	}
`;
IconButton.defaultProps = {
	type: 'button',
	color: 'text',
	p: 0,
	fontSize: 'sm',
};
export default IconButton;
