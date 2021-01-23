/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Form, Formik } from 'formik';
import { FC, useEffect, useMemo, useState } from 'react';
import { Box, Flex } from '../../components/Styled';
import Text from '../../components/Text';
import { useSelectQuery } from '../../hooks/useSqlQuery';
import { useTab } from '../../hooks/useTab';
import { CreatureTabState, TabsMetadata } from '../../utils/tabs';
import TextInput from '../../components/form/TextInput';
import TabButton from '../../components/TabButton';
import formToSql from '../../utils/formToSql';
import AutoFormUpdate from '../../components/form/AutoFormUpdate';
import Button from '../../components/Button';
import {
	CreatureTemplate,
	InitialCreatureTemplate,
} from '../../utils/tables/creature_template';
import TableSelectInput from '../../components/form/TableSelectInput';
import { Faction, mapFactionRows } from '../../utils/tables/faction';

// TODO: Add check that display probabilities add up to total probability

type K = keyof CreatureTemplate;

const CreatureTab: FC<{ id: string }> = ({ id }) => {
	const [{ entry, values }, { update }] = useTab<CreatureTabState>(id);

	const response = useSelectQuery<CreatureTemplate>(
		entry
			? `SELECT * FROM \`creature_template\` WHERE \`entry\` = ${entry}`
			: ''
	);

	// Update tab name
	useEffect(
		() =>
			update({
				name:
					response.data?.result?.[0]?.name ??
					// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
					(values?.name || 'New Creature Tab'),
			}),
		[update, response.data, values?.name]
	);

	const initialValues = useMemo(
		() => response.data?.result?.[0] ?? InitialCreatureTemplate(),
		[response.data]
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

	return (
		<Formik
			initialValues={values ?? initialValues}
			onSubmit={async () => {
				console.log(
					formToSql(TabsMetadata.Creature as never, values, initialValues)
				);
			}}
		>
			<Form>
				<AutoFormUpdate onUpdate={update} />
				<Flex flexDirection="column" alignItems="flex-start" m={4}>
					<Flex>
						<Flex flexDirection="column" mr={3}>
							<TextInput<K>
								name="entry"
								label="Entry"
								disabled
								mb={3}
								placeholder="*"
							/>
						</Flex>
						<Flex flexDirection="column">
							<TextInput<K> name="patch" label="Patch" disabled mb={3} />
						</Flex>
					</Flex>
					<TextInput<K> name="name" label="Name" fontSize="xl" mb={3} />
					<TextInput<K> name="subname" label="Subname" fontSize="lg" mb={3} />

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
						</Flex>
					</Flex>

					<Flex flexDirection="column">
						<Text as="label">Level</Text>
						<Flex>
							<TextInput<K> type="number" name="level_min" />
							<Box mx={2}>-</Box>
							<TextInput<K> type="number" name="level_max" />
						</Flex>
					</Flex>

					<Flex flexDirection="column">
						<Text as="label">Health</Text>
						<Flex>
							<TextInput<K> type="number" name="health_min" />
							<Box mx={2}>-</Box>
							<TextInput<K> type="number" name="health_max" />
						</Flex>
					</Flex>

					<Flex flexDirection="column">
						<Text as="label">Mana</Text>
						<Flex>
							<TextInput<K> type="number" name="mana_min" />
							<Box mx={2}>-</Box>
							<TextInput<K> type="number" name="mana_max" />
						</Flex>
					</Flex>

					<TableSelectInput<K, Faction>
						name="faction"
						label="Faction"
						table="faction"
						mapRows={mapFactionRows}
					/>

					<Button type="submit" mt={4} variant="primary">
						Submit
					</Button>

					<Box as="details" mb={2} mx={2}>
						<Box as="summary" mb={2} fontSize="lg">
							Query
						</Box>
						<Text>
							{formToSql(TabsMetadata.Creature as never, values, initialValues)}
						</Text>
					</Box>
				</Flex>
			</Form>
		</Formik>
	);
};

export default CreatureTab;
