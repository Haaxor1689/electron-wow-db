import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/form/TextInput';
import { Flex } from '../../components/Styled';
import Table from '../../components/Table';
import Text from '../../components/Text';
import { SelectResponse } from '../../hooks/useSqlQuery';
import useTableData from '../../hooks/useTableData';
import { compare } from '../../utils';

const CompareTab: FC = () => {
	const [val, setVal] = useState<SelectResponse<Record<string, unknown>>>();

	const data = useTableData(val);

	return (
		<Flex
			flexDirection="column"
			flexGrow={1}
			justifyContent="center"
			maxHeight="100vh"
		>
			<Formik
				initialValues={{ lhs: '', rhs: '' }}
				onSubmit={async (values) => {
					const left = JSON.parse(values.lhs) as Record<string, unknown>[];
					// const right = JSON.parse(values.rhs) as Record<string, unknown>[];
					const sortingKey = Object.keys(left[0])[0];
					setVal({
						result: left.sort((lhs, rhs) =>
							compare(lhs[sortingKey], rhs[sortingKey])
						),
						fields: Object.keys(left?.[0]).map(
							(k) => ({ name: k, flags: 0 } as any)
						),
						// rhs: {
						// 	result: right.sort((lhs, rhs) =>
						// 		compare(lhs[sortingKey], rhs[sortingKey])
						// 	),
						// 	fields: Object.keys(right?.[0]).map(
						// 		(k) => ({ name: k, flags: 0 } as any)
						// 	),
						// },
					});
				}}
			>
				<Form>
					<Flex flexDirection="column" alignItems="center" mb={4}>
						<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={3}>
							Compare two JSON tables
						</Text>
						<Flex>
							<Flex alignItems="center" width={1 / 2} px={4}>
								<TextInput variant="lg" label="Lhs" name="lhs" />
							</Flex>
							<Flex alignItems="center" width={1 / 2} px={4}>
								<TextInput variant="lg" label="Rhs" name="rhs" />
							</Flex>
						</Flex>
						<Button type="submit" my="3" variant="primary">
							Compare
						</Button>
					</Flex>
				</Form>
			</Formik>
			<Table data={data} setSorting={() => {}} />
		</Flex>
	);
};

export default CompareTab;
