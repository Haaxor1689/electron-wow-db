import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import { Flex } from '../components/Styled';
import TextInput from '../components/form/TextInput';
import Button from '../components/Button';
import { DbLoginStore } from '../hooks/useDatabase';
import Text from '../components/Text';

type K = keyof typeof DbLoginStore.store;

const DbLogin: FC<{ loading: boolean }> = ({ loading }) => (
	<Formik
		initialValues={DbLoginStore.store}
		onSubmit={async (values) => DbLoginStore.set(values)}
	>
		<Form>
			<Flex flexDirection="column" fontSize="lg" alignItems="center" mx={5}>
				<Text fontSize="xl" my={5}>
					Login to MySQL database
				</Text>
				<TextInput<K>
					variant="lg"
					label="Host"
					name="host"
					width={500}
					mb={3}
				/>
				<TextInput<K>
					variant="lg"
					label="User"
					name="user"
					width={500}
					mb={3}
				/>
				<TextInput<K>
					type="password"
					variant="lg"
					label="Password"
					name="password"
					width={500}
					mb={3}
				/>
				<TextInput<K>
					variant="lg"
					label="Database"
					name="database"
					width={500}
					mb={3}
				/>
				<Button
					type="submit"
					fontSize="xl"
					px={4}
					my={3}
					variant="primary"
					disabled={loading}
				>
					Login
				</Button>
			</Flex>
		</Form>
	</Formik>
);

export default DbLogin;
