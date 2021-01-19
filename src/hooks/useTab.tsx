import {
	createContext,
	Dispatch,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from 'react';
import { TabsMetadata, TabState } from '../utils/tabs';

type State = {
	selected?: string;
	tabs: TabState[];
};

const InitialState: State = {
	tabs: [],
};

type Actions =
	| { type: 'Add'; tab: Partial<TabState> & Pick<TabState, 'type'> }
	| {
			type: 'Update';
			tab: Partial<Omit<TabState, 'type'>> & Pick<TabState, 'id'>;
	  }
	| { type: 'Remove'; id: string }
	| { type: 'Select'; id: string };

const reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case 'Add': {
			console.log('[WOWDB] Dispatch: Add', JSON.stringify(action.tab));
			const newTab = TabsMetadata[action.tab.type].initialData(action.tab);
			return {
				...state,
				tabs: [...state.tabs, newTab],
				selected: newTab.id,
			};
		}
		case 'Update': {
			console.log('[WOWDB] Dispatch: Update', JSON.stringify(action.tab));
			const index = state.tabs.findIndex((t) => t.id === action.tab.id);
			const tabs = [...state.tabs];
			tabs.splice(index, 1, {
				...state.tabs[index],
				...action.tab,
			});
			return { ...state, tabs };
		}
		case 'Remove': {
			console.log('[WOWDB] Dispatch: Update', action.id);
			const index = state.tabs.findIndex((t) => t.id === action.id);
			const tabs = [...state.tabs];
			tabs.splice(index, 1);
			return {
				...state,
				selected: state.selected === action.id ? undefined : state.selected,
				tabs,
			};
		}
		case 'Select': {
			console.log('[WOWDB] Dispatch: Select', action.id || 'Home');
			return { ...state, selected: action.id };
		}
		default:
			throw Error(`[WOWDB] Error: Uknown action ${JSON.stringify(action)}`);
	}
};

const TabContext = createContext<[State, Dispatch<Actions>]>([
	InitialState,
	() => {},
]);

export const useTabProvider = () =>
	[...useReducer(reducer, InitialState), TabContext.Provider] as const;

export const useTab = <T extends TabState>(id: string) => {
	const [state, dispatch] = useContext(TabContext);
	const tab = useMemo(() => state.tabs.find((t) => t.id === id), [
		id,
		state.tabs,
	]);
	const update = useCallback(
		(t: Omit<Partial<T>, 'id' | 'type'>) =>
			dispatch({ type: 'Update', tab: { id, ...t } }),
		[dispatch, id]
	);
	return [tab as T, { update }] as const;
};

export const useAddTab = () => {
	const [, dispatch] = useContext(TabContext);
	return useCallback(
		(tab: Partial<TabState> & Pick<TabState, 'type'>) =>
			dispatch({ type: 'Add', tab }),
		[dispatch]
	);
};
