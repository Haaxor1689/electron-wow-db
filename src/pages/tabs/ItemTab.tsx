/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Form, Formik } from 'formik';
import { FC, useEffect, useMemo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, Flex } from '../../components/Styled';
import Text from '../../components/Text';
import { useSelectQuery } from '../../hooks/useSqlQuery';
import { useTab } from '../../hooks/useTab';
import { ItemTabState, TabsMetadata } from '../../utils/tabs';
import TextInput from '../../components/form/TextInput';
import formToSql from '../../utils/formToSql';
import AutoFormUpdate from '../../components/form/AutoFormUpdate';
import Button from '../../components/Button';
import {
	InitialItemTemplate,
	ItemTemplate,
} from '../../utils/tables/item_template';

type K = keyof ItemTemplate;

const ItemTab: FC<{ id: string }> = ({ id }) => {
	const [{ entry, values }, { update }] = useTab<ItemTabState>(id);

	const response = useSelectQuery<ItemTemplate>(
		entry ? `SELECT * FROM \`item_template\` WHERE \`entry\` = ${entry}` : ''
	);

	// Update tab name
	useEffect(
		() =>
			update({
				name:
					response.data?.result?.[0]?.name ??
					// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
					(values?.name || 'New Item Tab'),
			}),
		[update, response.data, values?.name]
	);

	const initialValues = useMemo(
		() => response.data?.result?.[0] ?? InitialItemTemplate(),
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
							TabsMetadata.Item as never,
							values ?? {},
							initialValues
						) || '-- No changes'}
					</SyntaxHighlighter>
				</Box>
			</Box>
		</Formik>
	);
};

export default ItemTab;
