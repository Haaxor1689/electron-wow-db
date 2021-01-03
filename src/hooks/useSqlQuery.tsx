import { useQuery as useReactQuery } from 'react-query';
import useDatabase from './useDatabase';

const useSqlQuery = <T extends unknown>(query: string) => {
	const sql = useDatabase();
	return useReactQuery(query, () => sql?.query<T>(query));
};

export default useSqlQuery;
