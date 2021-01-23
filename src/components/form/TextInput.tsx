import { ErrorMessage, useField } from 'formik';
import React from 'react';
import { InputProps } from '../../typings';
import Input from '../Input';

const TextInput = <Key extends string>({
	variant,
	name,
	label,
	...props
}: InputProps<Key, HTMLInputElement>) => {
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
