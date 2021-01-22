import { ErrorMessage, useField } from 'formik';
import React, { FC } from 'react';
import Input from '../Input';
import { BoxProps } from '../Styled';

type Props = {
	variant?: 'lg';
	name: string;
} & Omit<React.HTMLProps<HTMLInputElement>, 'as'> &
	BoxProps;

const TextInput: FC<Props> = ({ variant, name, label, ...props }) => {
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
