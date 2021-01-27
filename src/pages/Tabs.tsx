/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC, Fragment, useMemo } from 'react';
import { FaHome, FaTimes } from 'react-icons/fa';
import TabButton from '../components/TabButton';
import { Box, Flex, Grid } from '../components/Styled';
import { useTabProvider } from '../hooks/useTab';
import TabSwitch from './TabSwitch';
import IconButton from '../components/IconButton';
import Text from '../components/Text';
import Button from '../components/Button';
import { TabTypes } from '../utils/tabs';
import Search from './Search';

const Tabs: FC = () => {
	const [state, dispatch, TabProvider] = useTabProvider();
	const activeTab = useMemo(
		() => state.tabs.find((t) => t.id === state.selected),
		[state.tabs, state.selected]
	);
	return (
		<TabProvider value={[state, dispatch]}>
			<Flex
				px={1}
				css={css`
					gap: 1px;
					border-bottom-width: 1px;
				`}
			>
				<TabButton px={2} onClick={() => dispatch({ type: 'Select', id: '' })}>
					<FaHome />
				</TabButton>
				{state.tabs.map((t) => (
					<TabButton
						key={t.id}
						active={state.selected === t.id}
						onClick={() => dispatch({ type: 'Select', id: t.id })}
					>
						<Text as="span" mr={2}>
							{t.name}
						</Text>
						<IconButton onClick={() => dispatch({ type: 'Remove', id: t.id })}>
							<FaTimes />
						</IconButton>
					</TabButton>
				))}
			</Flex>
			{activeTab ? (
				<TabSwitch tab={activeTab} />
			) : (
				<Fragment>
					<Text fontSize={80} fontWeight="bold" textAlign="center" my={4}>
						Electron WoW
					</Text>
					<Box as="details" mb={2} mx={2}>
						<Box as="summary" mb={2}>
							Raw tabs
						</Box>
						<Grid gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))">
							{TabTypes.map((t) => (
								<Button
									key={t}
									onClick={() => dispatch({ type: 'Add', tab: { type: t } })}
								>
									{t}
								</Button>
							))}
						</Grid>
					</Box>
					<Search />
				</Fragment>
			)}
		</TabProvider>
	);
};

export default Tabs;
