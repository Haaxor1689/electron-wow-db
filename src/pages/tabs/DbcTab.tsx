import { Form, Formik } from 'formik';
import React, { FC } from 'react';
import Button from '../../components/Button';
import TextInput from '../../components/form/TextInput';
import { Flex } from '../../components/Styled';
import Text from '../../components/Text';
import useDbcFile from '../../hooks/useDBCFile';
import { DbcTabState } from '../../utils/tabs';
import { useTab } from '../../hooks/useTab';

const DbcTab: FC<{ id: string }> = ({ id }) => {
	const [{ filename }, { update }] = useTab<DbcTabState>(id);

	const header = useDbcFile(filename);

	return (
		<>
			<Formik
				initialValues={{ filename }}
				enableReinitialize
				onSubmit={async (values) => {
					console.log(values.filename);

					return update({ ...values });
				}}
			>
				<Form>
					<Flex flexDirection="column" alignItems="center" mb={4}>
						<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={3}>
							Open DBC file
						</Text>
						<Flex fontSize="lg" alignItems="center">
							<TextInput variant="lg" name="filename" width={800} />
						</Flex>
						<Button type="submit" my="3" variant="primary">
							Evaluate
						</Button>
					</Flex>
				</Form>
			</Formik>
			{JSON.stringify(header)}
		</>
	);
};

export default DbcTab;
