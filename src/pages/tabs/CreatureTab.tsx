/** @jsx jsx */
import { Form, Formik } from 'formik';
import { jsx, css } from '@emotion/react';
import { FC, useEffect } from 'react';
import { Flex } from '../../components/Styled';
import Text from '../../components/Text';
import { useSelectQuery } from '../../hooks/useSqlQuery';
import { useTab } from '../../hooks/useTab';
import { CreatureTabState } from '../../utils/tabs';
import { DB } from '../../typings';

const CreatureTab: FC<{ id: string }> = ({ id }) => {
	const [{ entry }, { update }] = useTab<CreatureTabState>(id);

	const response = useSelectQuery<DB.CreatureTemplate>(
		entry
			? `SELECT * FROM \`creature_template\` WHERE \`entry\` = ${entry}`
			: ''
	);

	useEffect(
		() => response.data && update({ name: response.data?.result[0].name }),
		[update, response.data]
	);

	if (response.isLoading) {
		return (
			<Text textAlign="center" my={4}>
				Loading...
			</Text>
		);
	}

	if (response.isError || !response.data) {
		return (
			<Text textAlign="center" my={4}>
				Error
			</Text>
		);
	}

	const data = response.data.result[0];

	return (
		<Formik
			initialValues={data}
			enableReinitialize
			onSubmit={async (values) => update({ ...values })}
		>
			<Form>
				<Flex flexDirection="column" m={4}>
					<Text fontSize="xl" fontWeight="bold" textAlign="center">
						{data.name}
					</Text>
					{data.subname && (
						<Text fontSize="lg" fontWeight="bold" textAlign="center" mb={3}>
							{data.subname}
						</Text>
					)}
					<Text
						css={css`
							white-space: pre-wrap;
						`}
					>
						{JSON.stringify(data, null, 4)}
					</Text>
				</Flex>
			</Form>
		</Formik>
	);
};

export default CreatureTab;
