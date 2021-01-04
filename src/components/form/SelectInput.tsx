import { ErrorMessage, useField } from 'formik';
import React, { FC } from 'react';
import { Select } from '../Input';
import { Flex } from '../Styled';

type Props = {
	variant?: 'lg';
	options: string[];
	name: string;
} & Omit<React.HTMLProps<HTMLSelectElement>, 'as'>;

const SelectInput: FC<Props> = ({
	variant,
	options,
	name,
	label,
	placeholder,
	...props
}) => {
	const [field] = useField<string>(name);
	return (
		<Flex>
			{label && <label htmlFor={name}>{label}</label>}
			<Select
				{...field}
				{...props}
				{...(variant === 'lg' ? { fontSize: 'lg', p: 2 } : {})}
			>
				<option value="" label={placeholder} disabled selected hidden />
				{options.map((o) => (
					<option key={o} value={o} label={o} />
				))}
			</Select>
			<ErrorMessage name={name} />
		</Flex>
	);
};

export default SelectInput;
