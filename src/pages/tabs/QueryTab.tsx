import { Form, Formik } from 'formik';
import React, { FC, useEffect, useMemo } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import Button from '../../components/Button';
import SelectInput from '../../components/form/SelectInput';
import TextInput from '../../components/form/TextInput';
import { Flex } from '../../components/Styled';
import Table from '../../components/Table';
import Text from '../../components/Text';
import TextButton from '../../components/TextButton';
import useDatabase from '../../hooks/useDatabase';
import { useSelectQuery } from '../../hooks/useSqlQuery';
import { useTab } from '../../hooks/useTab';
import { QueryTabState } from '../../utils/tabs';
import useTableData from '../../hooks/useTableData';
import { DB } from '../../typings';

const QueryTab: FC<{ id: string }> = ({ id }) => {
	const [{ table, where, sorting, pageSize, page }, { update }] = useTab<
		QueryTabState
	>(id);

	const { tables } = useDatabase();
	const tableOptions = useMemo(
		() => tables.map((t) => ({ value: t, label: t })),
		[tables]
	);

	const response = useSelectQuery<DB.Conditions>(
		table
			? `SELECT * FROM \`${table}\`${where ? ` WHERE ${where}` : ''}${
					sorting ? ` ORDER BY ${sorting[0]} ${sorting[1]}` : ''
			  } LIMIT ${pageSize} OFFSET ${pageSize * page}`
			: ''
	);

	const data = useTableData(response.data);

	// Reset page when pageSize or sorting changes
	useEffect(() => update({ page: 0 }), [update, pageSize, table]);

	// Reset sorting when query changes
	useEffect(() => update({ sorting: undefined }), [update, table]);

	// Update tab name after arguments change
	useEffect(() => {
		if (table) update({ name: `${table}${where ? ` WHERE ${where}` : ''}` });
	}, [update, table, where]);

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
		<>
			<Formik
				initialValues={{ table, where }}
				enableReinitialize
				onSubmit={async (values) => update({ ...values })}
			>
				<Form>
					<Flex flexDirection="column" alignItems="center" mb={4}>
						<Text fontSize="xl" fontWeight="bold" textAlign="center" mb={3}>
							Evaluate query
						</Text>
						<Flex fontSize="lg" alignItems="center">
							<Text mr={3}>SELECT * FROM</Text>
							<SelectInput variant="lg" name="table" options={tableOptions} />
							<Text mx={3}>WHERE</Text>
							<TextInput variant="lg" name="where" width={500} />
						</Flex>
						<Button type="submit" my="3" variant="primary">
							Evaluate
						</Button>
						{data && (
							<>
								<Flex alignItems="baseline">
									<Text as="span" mr={2}>
										Page size:
									</Text>
									{[25, 50, 75, 100].map((p) => (
										<TextButton
											key={p}
											selected={p === pageSize}
											onClick={() => update({ pageSize: p })}
										>
											{p}
										</TextButton>
									))}
								</Flex>
								<Flex alignItems="baseline">
									<TextButton
										onClick={() => update({ page: Math.max(page - 1, 0) })}
									>
										<FaAngleDoubleLeft />
									</TextButton>
									<Text as="span" mx={2}>
										Page {page}
									</Text>
									<TextButton onClick={() => update({ page: page + 1 })}>
										<FaAngleDoubleRight />
									</TextButton>
								</Flex>
							</>
						)}
					</Flex>
				</Form>
			</Formik>
			<Table
				data={data}
				sorting={sorting}
				setSorting={(s) => update({ sorting: s })}
			/>
		</>
	);
};

export default QueryTab;
