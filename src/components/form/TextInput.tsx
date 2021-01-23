import { ErrorMessage, useField } from 'formik';
import React from 'react';
import Input from '../Input';
import { BoxProps } from '../Styled';

type Props<Key extends string> = {
	variant?: 'lg';
	name: Key;
} & Omit<React.HTMLProps<HTMLInputElement>, 'as'> &
	BoxProps;

const TextInput = <Key extends string>({
	variant,
	name,
	label,
	...props
}: Props<Key>) => {
	const [field] = useField<string>(name);
	return (
		<>
			{label && <label htmlFor={name}>{label}</label>}
			<Input
				{...field}
				{...props}
				{...(variant === 'lg' ? { fontSize: 'lg', p: 2 } : {})}
			/>
			<ErrorMessage name={name} />
		</>
	);
};

export default TextInput;
