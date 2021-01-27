/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { mapValues } from 'lodash-es';
import { FC, Fragment, useMemo, useState } from 'react';
import { FaEdit, FaKey, FaSortDown, FaSortUp } from 'react-icons/fa';
import { SelectResponse } from '../hooks/useSqlQuery';
import { useAddTab } from '../hooks/useTab';
import { SQL } from '../typings';
import { getCodeColor } from '../utils';
import { TabsMetadata, TabTypeVariant } from '../utils/tabs';
import Chip from './Chip';
import IconButton from './IconButton';
import { Box, Flex } from './Styled';
import Text from './Text';
import TextButton from './TextButton';

type Props = {
	data?: SelectResponse<
		Record<
			string,
			{ value: unknown; status?: 'modified' | 'deleted' | 'added' }
		>
	>;
	sorting?: SQL.OrderBy;
	setSorting?: (sorting?: SQL.OrderBy) => void;
};

const Table: FC<Props> = ({ data, sorting, setSorting }) => {
	const [hiddenFields, setHiddenFields] = useState<Record<number, boolean>>({});

	// Check if there is a TabType for current table
	const relevantTab = useMemo(() => {
		const tab = Object.entries(TabsMetadata).find(
			(e) => e[1].table === data?.fields[0]?.table
		);
		return tab
			? { type: tab[0] as TabTypeVariant, key: tab[1].key as string }
			: undefined;
	}, [data?.fields]);

	const addTab = useAddTab();

	if (!data || data.fields.length <= 0) {
		return (
			<Text textAlign="center" fontStyle="italic" opacity={0.5}>
				No results
			</Text>
		);
	}

	return (
		<Fragment>
			<Box as="details" mb={2} mx={2}>
				<Box as="summary" mb={2}>
					Columns
				</Box>
				<Flex
					flexWrap="wrap"
					css={(theme) =>
						css`
							gap: ${theme.space[2]}px;
						`
					}
				>
					{data.fields.map((k, i) => (
						<Chip
							key={i}
							active={!hiddenFields[i]}
							onClick={() =>
								setHiddenFields((hf) => ({
									...hf,
									[i]: !hiddenFields[i],
								}))
							}
						>
							{k.name}
						</Chip>
					))}
				</Flex>
			</Box>
			<Box
				flexGrow={1}
				css={css`
					overflow-x: auto;
				`}
			>
				<table
					css={css`
						position: relative;
						border-collapse: collapse;
						border-bottom-width: 1px;
						min-width: 100%;
					`}
				>
					<thead>
						<tr>
							{relevantTab && (
								<Box
									as="th"
									position="sticky"
									top={0}
									left={0}
									p={0}
									bg="bgGrey"
									fontWeight="normal"
									textAlign="left"
									zIndex={2}
								>
									<Flex
										py={2}
										px={1}
										justifyContent="center"
										css={css`
											border-width: 1px;
										`}
									>
										*
									</Flex>
								</Box>
							)}
							{data.fields.map((k, i) =>
								hiddenFields[i] ? null : (
									<Box
										key={i}
										as="th"
										position="sticky"
										top={0}
										p={0}
										bg="bgGrey"
										fontWeight="normal"
										minWidth={100}
										textAlign="left"
										zIndex={1}
										title={Object.entries(SQL.FieldFlags)
											.filter((e) => typeof e[1] === 'number')
											// eslint-disable-next-line no-bitwise
											.filter((e) => k.flags & (e[1] as never))
											.map((e) => e[0])
											.join(', ')}
										css={css`
											border-left-width: 1px;
											border-right-width: 1px;
											white-space: nowrap;

											${relevantTab &&
											css`
												:nth-child(2) {
													border-left-width: 0;
												}
											`}
										`}
									>
										<Flex
											py={2}
											px={1}
											onClick={() =>
												setSorting?.(
													sorting?.[0] !== k.name
														? [k.name, 'ASC']
														: sorting[1] === 'ASC'
														? [k.name, 'DESC']
														: undefined
												)
											}
											css={css`
												border-top-width: 1px;
												border-bottom-width: 1px;
												white-space: nowrap;
											`}
										>
											{SQL.isPrimaryKey(k.flags) ? (
												<Box as={FaKey} fontSize="sm" mr={1} />
											) : null}
											<Text as="span">{k.name}</Text>
											{sorting?.[0] === k.name && (
												<Flex flexGrow={1} justifyContent="flex-end">
													{sorting[1] === 'ASC' ? <FaSortUp /> : <FaSortDown />}
												</Flex>
											)}
										</Flex>
									</Box>
								)
							)}
						</tr>
					</thead>
					<tbody>
						{data.result.map((r, ri) => (
							<tr
								key={ri}
								css={(theme) => css`
									:nth-child(even) {
										background-color: ${theme.colors.bgGrey};
									}
									:hover {
										background-color: ${theme.colors.bgHover};
									}
									:focus-within {
										background-color: ${theme.colors.focus};
									}
									:focus-within:hover {
										background-color: ${theme.colors.focusHover};
									}
								`}
							>
								{relevantTab && (
									<Box
										as="td"
										position="sticky"
										left={0}
										p={0}
										tabIndex={0}
										bg="bgGrey"
									>
										<Box
											py={2}
											px={1}
											css={css`
												border-left-width: 1px;
												border-right-width: 1px;
											`}
										>
											<IconButton
												onClick={() =>
													addTab({
														type: relevantTab.type,
														[relevantTab.key]: r[relevantTab.key].value,
														values: mapValues(r, (v) => v.value),
													})
												}
											>
												<FaEdit />
											</IconButton>
										</Box>
									</Box>
								)}
								{Object.values(r).map((c, ci) =>
									hiddenFields[ci] ? null : (
										<Box
											as="td"
											key={ci}
											py={2}
											px={1}
											color={getCodeColor(c.value)}
											fontWeight={
												SQL.isPrimaryKey(data.fields[ci].flags)
													? 'bold'
													: undefined
											}
											tabIndex={0}
											css={(theme) => css`
												white-space: nowrap;
												border-left-width: 1px;
												border-right-width: 1px;
												${
													c.status === 'modified' &&
													css`
														background-color: ${theme.colors.bgWarn};
													`
												}
												${
													c.status === 'added' &&
													css`
														background-color: ${theme.colors.bgSuccess};
													`
												}
												${
													c.status === 'deleted' &&
													css`
														background-color: ${theme.colors.bgError};
													`
												}

												${
													relevantTab &&
													css`
														:nth-child(2) {
															border-left-width: 0;
														}
													`
												}
											`}
										>
											{JSON.stringify(c.value)}
										</Box>
									)
								)}
							</tr>
						))}
					</tbody>
				</table>
			</Box>
		</Fragment>
	);
};

export default Table;
