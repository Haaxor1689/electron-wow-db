/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { Box, Flex } from '../../components/Styled';
import Text from '../../components/Text';
import { useSelectQuery } from '../../hooks/useSqlQuery';
import { useTab } from '../../hooks/useTab';
import { CreatureTabState } from '../../utils/tabs';
import { DB } from '../../typings';
import TextInput from '../../components/form/TextInput';
import TabButton from '../../components/TabButton';

// TODO: Add check that display probabilities add up to total probability

const CreatureTab: FC<{ id: string }> = ({ id }) => {
	const [{ entry }, { update }] = useTab<CreatureTabState>(id);

	const response = useSelectQuery<DB.CreatureTemplate>(
		entry
			? `SELECT * FROM \`creature_template\` WHERE \`entry\` = ${entry}`
			: ''
	);

	// Update tab name
	useEffect(
		() => response.data && update({ name: response.data?.result[0].name }),
		[update, response.data]
	);

	// Display tabs
	const [displayTab, setDisplayTab] = useState(1);

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
				<Flex flexDirection="column" alignItems="flex-start" m={4}>
					<Flex>
						<Flex flexDirection="column" mr={3}>
							<TextInput name="entry" label="Entry" disabled mb={3} />
						</Flex>
						<Flex flexDirection="column">
							<TextInput name="patch" label="Patch" disabled mb={3} />
						</Flex>
					</Flex>
					<TextInput name="name" label="Name" fontSize="xl" mb={3} />
					<TextInput name="subname" label="Subname" fontSize="lg" mb={3} />

					<Flex flexDirection="column" my={3}>
						<Flex
							css={css`
								gap: 1px;
							`}
						>
							<Text fontSize="lg">Display</Text>
							<Box flexGrow={1} />
							{[1, 2, 3, 4].map((t) => (
								<TabButton
									key={t}
									active={displayTab === t}
									onClick={() => setDisplayTab(t)}
								>
									{t}
								</TabButton>
							))}
						</Flex>
						<Flex
							p={3}
							mb={2}
							css={(theme) => css`
								border-width: 1px;
								gap: ${theme.space[2]}px;
							`}
						>
							<TextInput
								type="number"
								name={`display_id${displayTab}`}
								label="Id"
							/>
							<TextInput
								type="number"
								name={`display_scale${displayTab}`}
								label="Scale"
								width={50}
							/>
							<TextInput
								type="number"
								name={`display_probability${displayTab}`}
								label="Prob"
								width={50}
							/>
						</Flex>
						<TextInput
							type="number"
							name="display_total_probability"
							label="Total probability"
						/>
					</Flex>

					<Flex flexDirection="column">
						<Text as="label">Level</Text>
						<Flex>
							<TextInput type="number" name="level_min" />
							<TextInput type="number" name="level_max" />
						</Flex>
					</Flex>

					<Flex flexDirection="column">
						<Text as="label">Health</Text>
						<Flex>
							<TextInput type="number" name="health_min" />
							<TextInput type="number" name="health_max" />
						</Flex>
					</Flex>

					<Flex flexDirection="column">
						<Text as="label">Mana</Text>
						<Flex>
							<TextInput type="number" name="mana_min" />
							<TextInput type="number" name="mana_max" />
						</Flex>
					</Flex>

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
