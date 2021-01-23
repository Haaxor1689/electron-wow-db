import React, { FC } from 'react';
import { TabState, TabTypeVariant } from '../utils/tabs';
import CreatureTab from './tabs/CreatureTab';
import DbcTab from './tabs/DbcTab';
import QueryTab from './tabs/QueryTab';

const TabComponent: Record<TabTypeVariant, FC<{ id: string }>> = {
	Query: QueryTab,
	Dbc: DbcTab,
	Creature: CreatureTab,
};

const TabSwitch: FC<{ tab: TabState }> = ({ tab }) => {
	const Component = TabComponent[tab.type];
	if (!Component) {
		throw Error(`[WOWDB] Error: Unknown tab to render ${JSON.stringify(tab)}`);
	}
	return <Component key={tab.id} id={tab.id} />;
};

export default TabSwitch;
