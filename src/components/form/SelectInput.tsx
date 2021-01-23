import { ErrorMessage, useField } from 'formik';
import React from 'react';
import { InputProps, SelectOption } from '../../typings';
import { Select } from '../Input';

type Props<Key extends string> = {
	options: SelectOption[];
} & InputProps<Key, HTMLSelectElement>;

const SelectInput = <Key extends string>({
	variant,
	options,
	name,
	label,
	placeholder,
	...props
}: Props<Key>) => {
	const [field] = useField<string>(name);
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<Select
				{...field}
				{...props}
				{...(variant === 'lg' ? { fontSize: 'lg', p: 2 } : {})}
			>
				<option value="" label={placeholder} disabled selected hidden />
				{options.map((o) => (
					<option key={o.value} {...o} />
				))}
			</Select>
			<ErrorMessage name={name} />
		</>
	);
};

export default SelectInput;
