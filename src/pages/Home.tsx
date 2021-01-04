import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import Button from '../components/Button';
import SelectInput from '../components/form/SelectInput';
import TextInput from '../components/form/TextInput';
import { Flex } from '../components/Styled';
import Table from '../components/Table';
import Text from '../components/Text';
import useDatabase from '../hooks/useDatabase';
import { useSelectQuery } from '../hooks/useSqlQuery';
import { DB } from '../typings';

const Home: FC = () => {
	const [query, setQuery] = useState('');
	const response = useSelectQuery<DB.Conditions>(query);
	const { tables } = useDatabase();

	return (
		<Flex flexDirection="column" flexGrow={1} justifyContent="center">
			<Formik
				initialValues={{ table: '', where: '' }}
				onSubmit={async (values) => {
					setQuery(
						`SELECT * FROM \`${values.table}\` ${
							values.where ? `WHERE ${values.where}` : 'LIMIT 100'
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
					</Flex>
				</Form>
			</Formik>
			<Table data={response.data} />
		</Flex>
	);
};

export default Home;
