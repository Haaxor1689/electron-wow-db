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
		query,
		() =>
			new Promise((resolve, reject) => {
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
