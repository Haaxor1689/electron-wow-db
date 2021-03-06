import React, { useMemo } from 'react';
import { useSelectQuery } from '../../hooks/useSqlQuery';
import { InputProps, SelectOption } from '../../typings';
import SelectInput from './SelectInput';

type Props<Key extends string, Row extends Record<string, unknown>> = {
	mapRows: (row: Row) => SelectOption;
} & InputProps<Key, HTMLSelectElement> &
	({ query: string; table?: never } | { table: string; query?: never });

const TableSelectInput = <
	Key extends string,
	Row extends Record<string, unknown>
>({
	table,
	query,
	mapRows,
	...props
}: Props<Key, Row>) => {
	const response = useSelectQuery<Row>(query ?? `SELECT * FROM \`${table}\``);
	const options = useMemo(
		() =>
			response.data?.result
				? [
						{ value: 0, label: 'None (0)' },
						...response.data.result.map(mapRows),
				  ]
				: [{ value: 0, label: 'Loading...' }],
		[mapRows, response.data?.result]
	);
	return (
		<SelectInput
			disabled={response.isLoading || response.isError}
			options={options}
			{...props}
		/>
	);
};

export default TableSelectInput;
