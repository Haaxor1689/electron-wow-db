import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import Button from '../components/Button';
import SelectInput from '../components/form/SelectInput';
import TextInput from '../components/form/TextInput';
import { Flex } from '../components/Styled';
import Table from '../components/Table';
import Text from '../components/Text';
import TextButton from '../components/TextButton';
import useDatabase from '../hooks/useDatabase';
import { useSelectQuery } from '../hooks/useSqlQuery';
import { DB, SQL } from '../typings';

const Home: FC = () => {
	const [query, setQuery] = useState<string>();

	const [sorting, setSorting] = useState<SQL.OrderBy>();

	const [pageSize, setPageSize] = useState(50);
	const [page, setPage] = useState(0);

	const response = useSelectQuery<DB.Conditions>(
		query
			? `${
					query + (sorting ? ` ORDER BY ${sorting[0]} ${sorting[1]}` : '')
			  } LIMIT ${pageSize} OFFSET ${pageSize * page}`
			: ''
	);
	const { tables } = useDatabase();

	useEffect(() => setPage(0), [pageSize, query]);
	useEffect(() => setSorting(undefined), [query]);

	return (
		<Flex
			flexDirection="column"
			flexGrow={1}
			justifyContent="center"
			maxHeight="100vh"
		>
			<Formik
				initialValues={{ table: '', where: '' }}
				onSubmit={async (values) => {
					setQuery(
						`SELECT * FROM \`${values.table}\`${
							values.where ? ` WHERE ${values.where}` : ''
						}`
					);
				}}
			>
				<Form>
					<Flex flexDirection="column" alignItems="center" mb={4}>
						<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={3}>
							Evaluate query
						</Text>
						<Flex fontSize="lg" alignItems="center">
							<Text mr={3}>SELECT * FROM</Text>
							<SelectInput variant="lg" name="table" options={tables} />
							<Text mx={3}>WHERE</Text>
							<TextInput variant="lg" name="where" />
						</Flex>
						<Button type="submit" my="3" variant="primary">
							Evaluate
						</Button>
						{response.data && (
							<>
								<Flex alignItems="baseline">
									<Text as="span" mr={2}>
										Page size:
									</Text>
									{[25, 50, 75, 100].map((p) => (
										<TextButton
											key={p}
											selected={p === pageSize}
											onClick={() => setPageSize(p)}
										>
											{p}
										</TextButton>
									))}
								</Flex>
								<Flex alignItems="baseline">
									<TextButton
										onClick={() => setPage((p) => Math.max(p - 1, 0))}
									>
										<FaAngleDoubleLeft />
									</TextButton>
									<Text as="span" mx={2}>
										Page {page}
									</Text>
									<TextButton onClick={() => setPage((p) => p + 1)}>
										<FaAngleDoubleRight />
									</TextButton>
								</Flex>
							</>
						)}
					</Flex>
				</Form>
			</Formik>
			<Table data={response.data} sorting={sorting} setSorting={setSorting} />
		</Flex>
	);
};

export default Home;
