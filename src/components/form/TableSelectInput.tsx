import React, { useMemo } from 'react';
import { useSelectQuery } from '../../hooks/useSqlQuery';
import { InputProps, SelectOption } from '../../typings';
import SelectInput from './SelectInput';

type Props<Key extends string, Row extends Record<string, unknown>> = {
	table: string;
	mapRows: (row: Row) => SelectOption;
} & InputProps<Key, HTMLSelectElement>;

const TableSelectInput = <
	Key extends string,
	Row extends Record<string, unknown>
>({
	table,
	mapRows,
	...props
}: Props<Key, Row>) => {
	const response = useSelectQuery<Row>(`SELECT * FROM \`${table}\``);
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
