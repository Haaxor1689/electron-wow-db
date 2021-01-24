/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Form, Formik } from 'formik';
import { FC, Fragment, useState } from 'react';
import { UseQueryResult } from 'react-query';
import Button from '../components/Button';
import TextInput from '../components/form/TextInput';
import { Flex } from '../components/Styled';
import TabButton from '../components/TabButton';
import Table from '../components/Table';
import Text from '../components/Text';
import { SelectResponse, useSelectQuery } from '../hooks/useSqlQuery';
import useTableData from '../hooks/useTableData';
import { DB } from '../typings';

const SearchTabs = ['Items', 'Creatures', 'Spells', 'Quests'] as const;
type SearchTabVariant = typeof SearchTabs[number];

const Search: FC = () => {
	const [name, setName] = useState('');

	const response: Record<
		SearchTabVariant,
		UseQueryResult<SelectResponse<Record<string, unknown>>>
	> = {
		Items: useSelectQuery<DB.Conditions>(
			`SELECT \`entry\`, \`patch\`, \`name\`, \`description\`, \`class\`, \`subclass\`, \`display_id\`, \`quality\`, \`required_level\`, \`bonding\` FROM \`item_template\` WHERE \`name\` LIKE "%${name}%" LIMIT 25`
		),
		Creatures: useSelectQuery<DB.Conditions>(
			`SELECT \`entry\`, \`patch\`, \`name\`, \`subname\`, \`level_min\`, \`level_max\`, \`faction\`, \`npc_flags\` FROM \`creature_template\` WHERE \`name\` LIKE "%${name}%" LIMIT 25`
		),
		Spells: useSelectQuery<DB.Conditions>(
			`SELECT \`entry\`, \`name1\`, \`nameSubtext1\`, \`description1\`, \`auraDescription1\` FROM \`spell_template\` WHERE \`name1\` LIKE "%${name}%" LIMIT 25`
		),
		Quests: useSelectQuery<DB.Conditions>(
			`SELECT \`entry\`, \`patch\`, \`Title\`, \`QuestLevel\`, \`RewItemId1\`, \`RewItemId2\`, \`RewItemId3\`, \`RewItemId4\` FROM \`quest_template\` WHERE \`Title\` LIKE "%${name}%" LIMIT 25`
		),
	};

	const [tab, setTab] = useState<SearchTabVariant>('Creatures');

	const data = useTableData(response[tab].data);

	if (Object.values(response).some((r) => r.isLoading)) {
		return (
			<Text textAlign="center" my={4}>
				Loading...
			</Text>
		);
	}

	if (Object.values(response).some((r) => r.isError || !r.data)) {
		return (
			<Text textAlign="center" my={4}>
				Error
			</Text>
		);
	}

	return (
		<Fragment>
			<Formik
				initialValues={{ name }}
				enableReinitialize
				onSubmit={async (values) => setName(values.name)}
			>
				<Form>
					<Flex flexDirection="column" alignItems="center" mb={4}>
						<Flex fontSize="lg" alignItems="center">
							<TextInput variant="lg" name="name" width={500} />
						</Flex>
						<Button type="submit" my="3" variant="primary">
							Search
						</Button>
					</Flex>
				</Form>
			</Formik>
			<Flex
				px={1}
				mb={3}
				css={css`
					gap: 1px;
					border-bottom-width: 1px;
				`}
			>
				{SearchTabs.map((t) => (
					<TabButton key={t} active={t === tab} onClick={() => setTab(t)}>
						{t}
					</TabButton>
				))}
			</Flex>
			<Table data={data} />
		</Fragment>
	);
};

export default Search;
