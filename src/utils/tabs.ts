import { v4 as uuid } from 'uuid';
import { SQL } from '../typings';
import { CreatureTemplate } from './tables/creature_template';

export const TabTypes = ['Query', 'Dbc', 'Creature'] as const;
export type TabTypeVariant = typeof TabTypes[number];

type TabBase<T extends TabTypeVariant> = {
	id: string;
	name: string;
	dirty?: boolean;
	type: T;
};

export type QueryTabState = TabBase<'Query'> & {
	table: string;
	where: string;
	sorting?: SQL.OrderBy;
	pageSize: number;
	page: number;
};

const InitialQueryTab = (
	initial: Partial<QueryTabState> = {}
): QueryTabState => ({
	id: uuid(),
	type: 'Query',
	name: 'New Query Tab',
	table: '',
	where: '',
	pageSize: 50,
	page: 0,
	...initial,
});

export type DbcTabState = TabBase<'Dbc'> & {
	filename: string;
};

const InitialDbcTab = (initial: Partial<DbcTabState> = {}): DbcTabState => ({
	id: uuid(),
	type: 'Dbc',
	name: 'New Dbc Tab',
	filename: '',
	...initial,
});

export type CreatureTabState = TabBase<'Creature'> & {
	entry?: number;
	values?: Partial<CreatureTemplate>;
};

const InitialCreatureTab = (
	initial: Partial<CreatureTabState> = {}
): CreatureTabState => ({
	id: uuid(),
	type: 'Creature',
	name: 'New Creature Tab',
	...initial,
});

export type TabState = QueryTabState | DbcTabState | CreatureTabState;

export type TabMetaType = {
	table?: string;
	key?: string;
	initialData: (initial: Partial<TabState>) => TabState;
};

export const TabsMetadata: Record<TabTypeVariant, TabMetaType> = {
	Query: {
		initialData: InitialQueryTab as never,
	},
	Dbc: {
		initialData: InitialDbcTab as never,
	},
	Creature: {
		table: 'creature_template',
		key: 'entry',
		initialData: InitialCreatureTab as never,
	},
};
