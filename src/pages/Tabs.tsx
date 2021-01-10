/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC, Fragment, ReactNode, useState } from 'react';
import TabButton from '../components/TabButton';
import { Flex } from '../components/Styled';
import QueryTab from './tabs/QueryTab';

type Tab = {
	id: number;
	name: string;
	render: ReactNode;
};

const Tabs: FC = () => {
	const [tabs, setTabs] = useState<Tab[]>([
		{ id: 0, name: 'New query tab', render: <QueryTab /> },
	]);
	const [selected, setSelected] = useState(0);
	return (
		<Fragment>
			<Flex
				css={css`
					border-bottom-width: 1px;
				`}
			>
				{tabs.map((t) => (
					<TabButton
						key={t.id}
						active={selected === t.id}
						onClick={() => setSelected(t.id)}
					>
						{t.name}
					</TabButton>
				))}
				<TabButton
					onClick={() =>
						setTabs((t) => [
							...t,
							{
								id: t.reduce(
									(acc, next) => (next.id >= acc ? next.id + 1 : acc),
									0
								),
								name: 'New query tab',
								render: <QueryTab />,
							},
						])
					}
				>
					+
				</TabButton>
			</Flex>
			{tabs.find((t) => t.id === selected)?.render}
		</Fragment>
	);
};

export default Tabs;
