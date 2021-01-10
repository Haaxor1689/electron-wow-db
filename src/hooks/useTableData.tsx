import mapValues from 'lodash-es/mapValues';
import { useMemo } from 'react';
import { SelectResponse } from './useSqlQuery';

const useTableData = <T extends Record<string, unknown>>(
	response?: SelectResponse<T>
) =>
	useMemo(
		() =>
			response
				? {
						...response,
						result: response.result.map((r) =>
							mapValues(r, (value) => ({ value }))
						),
				  }
				: undefined,
		[response]
	);
export default useTableData;
