/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Form, Formik } from 'formik';
import { FC, useEffect, useMemo, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
	NPCFlags,
} from '../../utils/tables/creature_template';
import TableSelectInput from '../../components/form/TableSelectInput';
import FlagsInput from '../../components/form/FlagsInput';
import {
	mapNamedFactionTemplateToRows,
	NamedFactionTemplate,
	SelectNamedFactionTemplate,
} from '../../utils/tables/faction_template';
import InputTabs from '../../components/form/InputTabs';

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
			enableReinitialize
			onSubmit={async () => {}}
		>
			<Box as={Form} flexGrow={1}>
				<AutoFormUpdate onUpdate={update} />
				<Flex
					position="relative"
					flexDirection="column"
					alignItems="flex-start"
					m={4}
				>
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

					<InputTabs count={4} title="Display">
						{(i) => (
							<TextInput type="number" name={`display_id${i}`} label="Id" />
						)}
					</InputTabs>

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

					<TableSelectInput<K, NamedFactionTemplate>
						name="faction"
						label="Faction"
						query={SelectNamedFactionTemplate}
						mapRows={mapNamedFactionTemplateToRows}
					/>

					<FlagsInput<K> name="npc_flags" label="Flags" flags={NPCFlags} />

					<Button type="submit" mt={4} variant="primary">
						Submit
					</Button>

					<Box flexGrow={1} flexBasis="100%" />
				</Flex>
				<Box
					position="sticky"
					bottom={0}
					px={4}
					css={css`
						border-top-width: 1px;
					`}
				>
					<Text fontSize="xl" fontWeight="bold">
						Generated query:
					</Text>
					<SyntaxHighlighter language="sql" style={vs2015}>
						{formToSql(
							TabsMetadata.Creature as never,
							values ?? {},
							initialValues
						) || '-- No changes'}
					</SyntaxHighlighter>
				</Box>
			</Box>
		</Formik>
	);
};

export default CreatureTab;
