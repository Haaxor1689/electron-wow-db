import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BoxProps, ComposeBox } from './Styled';

type Props = {
	ellipsis?: boolean;
};

const Text = styled.p<BoxProps & Props>`
	${ComposeBox()}
	${(p) =>
		p.ellipsis &&
		css`
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		`}
`;

export default Text;
