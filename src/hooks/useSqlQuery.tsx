import { MysqlError, FieldInfo } from 'mysql';
import { useQuery as useReactQuery } from 'react-query';
import useDatabase from './useDatabase';

export type SelectResponse<T> = {
	result: T[];
	fields: FieldInfo[];
};

export const useSelectQuery = <T extends unknown>(query: string) => {
	const { sql } = useDatabase();

	return useReactQuery<unknown, MysqlError, SelectResponse<T>>(
		[query, !!sql],
		() =>
			new Promise((resolve, reject) => {
				console.log('[WOWDB] Query:', query || '<Empty query>');
				if (!query) {
					resolve({ result: [], fields: [] });
					return;
				}
				sql?.query(query, (err, result, fields) => {
					if (err) {
						reject(err);
						return;
					}
					resolve({ result, fields });
				});
			})
	);
};
