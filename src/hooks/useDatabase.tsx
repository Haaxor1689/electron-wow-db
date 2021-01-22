import { createContext, useContext, useEffect, useState } from 'react';
import mysql from 'mysql';

type DatabaseContextType = {
	sql?: mysql.Connection;
	tables: string[];
};

// TODO: Add login screen
const database = 'turtle';

const DatabaseContext = createContext<DatabaseContextType>({ tables: [] });

export const useDatabaseProvider = () => {
	const [callbacks, setCallbacks] = useState<DatabaseContextType>({
		tables: [],
	});
	useEffect(() => {
		const sql = mysql.createConnection({
			host: '127.0.0.1',
			user: 'root',
			password: 'root',
			database,
		});
		sql.connect((err) => {
			if (err) {
				console.log('[WOWDB] Connection failed.', err.code, err.fatal);
				return;
			}
			console.log('[WOWDB] Connection opened.');
			sql.query('SHOW tables', (_, result: Record<string, string>[]) => {
				console.log(result);
				setCallbacks({
					sql,
					tables: result.map((r) => r[`Tables_in_${database}`] as string),
				});
			});
		});

		return () => {
			sql.end(() => {
				console.log('[WOWDB] Connection closed.');
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		value: callbacks,
		DatabaseContextProvider: DatabaseContext.Provider,
	};
};

const useDatabase = () => useContext(DatabaseContext);

export default useDatabase;
