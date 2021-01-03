import { createContext, useContext, useEffect, useState } from 'react';
import mysql from 'mysql';
import { promisify } from 'util';

type PromiseConnection = {
	query: <T>(query: string) => Promise<T>;
};

const DatabaseContext = createContext<PromiseConnection | undefined>(undefined);

export const useDatabaseProvider = () => {
	const [callbacks, setCallbacks] = useState<PromiseConnection>();
	useEffect(() => {
		const sql = mysql.createConnection({
			host: '127.0.0.1',
			user: 'root',
			password: 'root',
			database: 'mangos',
		});
		sql.connect((err) => {
			if (err) {
				console.log('Connection failed.', err.code, err.fatal);
				return;
			}
			console.log('Connection opened.');
			setCallbacks({
				query: promisify(sql.query).bind(sql) as any,
			});
		});

		return () => {
			sql.end(() => {
				console.log('Connection closed.');
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
