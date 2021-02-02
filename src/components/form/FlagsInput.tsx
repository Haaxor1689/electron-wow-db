/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Fragment, useMemo } from 'react';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { isNumber, omitBy } from 'lodash-es';
import { InputProps } from '../../typings';
import Chip from '../Chip';
import Input from '../Input';
import { Box, Flex } from '../Styled';

type Props<Key extends string> = {
	flags: Record<number, string>;
} & InputProps<Key, HTMLInputElement>;

const FlagsInput = <Key extends string>({
	variant,
	flags,
	name,
	label,
	placeholder,
	...props
}: Props<Key>) => {
	const [field] = useField<number>(name);
	const { setFieldValue, setFieldTouched } = useFormikContext();

	const clearedFlags = useMemo(() => omitBy(flags, isNumber), [flags]);

	return (
		<Fragment>
			{label && <label htmlFor={name}>{label}</label>}
			<Input
				{...field}
				{...props}
				{...(variant === 'lg' ? { fontSize: 'lg', p: 2 } : {})}
			/>
			<Box as="details">
				<Box as="summary" mb={2}>
					Options
				</Box>
				<Flex
					flexWrap="wrap"
					css={(theme) =>
						css`
							gap: ${theme.space[2]}px;
						`
					}
				>
					{Object.entries(clearedFlags).map(([flag, value]) => (
						<Chip
							key={flag}
							active={!!(field.value & Number(flag))}
							onClick={() => {
								setFieldTouched(name, true);
								setFieldValue(name, field.value ^ Number(flag));
							}}
						>
							{value} ({flag})
						</Chip>
					))}
				</Flex>
			</Box>
			<ErrorMessage name={name} />
		</Fragment>
	);
};

export default FlagsInput;
