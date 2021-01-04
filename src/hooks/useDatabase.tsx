import { createContext, useContext, useEffect, useState } from 'react';
import mysql from 'mysql';

type DatabaseContextType = {
	sql?: mysql.Connection;
	tables: string[];
};

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
			database: 'mangos',
		});
		sql.connect((err) => {
			if (err) {
				console.log('[WOWDB] Connection failed.', err.code, err.fatal);
				return;
			}
			console.log('[WOWDB] Connection opened.');
			sql.query('SHOW tables', (_, result: { Tables_in_mangos: string }[]) => {
				setCallbacks({ sql, tables: result.map((r) => r.Tables_in_mangos) });
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
