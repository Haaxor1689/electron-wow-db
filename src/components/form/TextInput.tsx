import { ErrorMessage, useField } from 'formik';
import React, { FC } from 'react';
import Input from '../Input';
import { Flex } from '../Styled';

type Props = {
	variant?: 'lg';
	name: string;
} & Omit<React.HTMLProps<HTMLInputElement>, 'as'>;

const TextInput: FC<Props> = ({ variant, name, label, ...props }) => {
	const [field] = useField<string>(name);
	return (
		<Flex>
			{label && <label htmlFor={name}>{label}</label>}
			<Input
				{...field}
				{...props}
				{...(variant === 'lg' ? { fontSize: 'lg', p: 2 } : {})}
			/>
			<ErrorMessage name={name} />
		</Flex>
	);
};

export default TextInput;
