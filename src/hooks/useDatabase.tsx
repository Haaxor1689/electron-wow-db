import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import mysql from 'mysql';
import Store from 'electron-store';

export const DbLoginStore = new Store({
	defaults: {
		host: '',
		user: '',
		password: '',
		database: '',
	},
	watch: true,
});

type DatabaseContextType = {
	sql?: mysql.Connection;
	tables: string[];
};

// TODO: Add login screen
const database = 'turtle';

const DatabaseContext = createContext<DatabaseContextType>({
	tables: [],
});

export const useDatabaseProvider = () => {
	const [callbacks, setCallbacks] = useState<DatabaseContextType>({
		tables: [],
	});
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);

	const createConnection = useCallback(
		(config?: mysql.ConnectionConfig) => {
			if (!config) {
				console.log('[WOWDB] Connection failed. No config provided.');
				return;
			}
			callbacks.sql?.end(() => {
				console.log('[WOWDB] Connection closed.');
			});
			setLoading(true);
			const sql = mysql.createConnection(config);
			sql.connect((err) => {
				setLoading(false);
				if (err) {
					console.log('[WOWDB] Connection failed.', err.code, err.fatal);
					setError(err.code);
					return;
				}
				console.log('[WOWDB] Connection opened.');
				sql.query('SHOW tables', (_, result: Record<string, string>[]) => {
					console.log(result);
					setError(undefined);
					setCallbacks((prev) => ({
						...prev,
						sql,
						tables: result.map((r) => r[`Tables_in_${database}`] as string),
					}));
				});
			});
		},
		[callbacks.sql]
	);

	useEffect(() => {
		createConnection(DbLoginStore.store);
		const unsubSoreChanges = DbLoginStore.onDidAnyChange(createConnection);
		return () => {
			callbacks.sql?.end(() => {
				console.log('[WOWDB] Connection closed.');
			});
			unsubSoreChanges();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		value: callbacks,
		DatabaseContextProvider: DatabaseContext.Provider,
		error,
		loading,
		retryConnection: () => createConnection(DbLoginStore.store),
	};
};

const useDatabase = () => useContext(DatabaseContext);

export default useDatabase;
