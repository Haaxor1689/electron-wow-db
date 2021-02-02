/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC, ReactNode, useState } from 'react';
import { Box, Flex, FlexProps } from '../Styled';
import TabButton from '../TabButton';
import Text from '../Text';

type Props = {
	count: number;
	title: string;
	children: (i: number) => ReactNode;
} & FlexProps;

const InputTabs: FC<Props> = ({ count, title, children, ...props }) => {
	const [tab, setTab] = useState(1);

	return (
		<Flex flexDirection="column" my={3} {...props}>
			<Flex
				css={css`
					gap: 1px;
				`}
			>
				<Text fontSize="lg" mr={3}>
					{title}
				</Text>
				<Box flexGrow={1} />
				{[...Array(count).keys()].map((t) => (
					<TabButton key={t} active={tab === t} onClick={() => setTab(t)}>
						{t + 1}
					</TabButton>
				))}
			</Flex>
			<Flex
				p={3}
				mb={2}
				css={(theme) => css`
					border-width: 1px;
					gap: ${theme.space[2]}px;
				`}
			>
				{children(tab + 1)}
			</Flex>
		</Flex>
	);
};

export default InputTabs;
