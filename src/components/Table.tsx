/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC, Fragment, useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { SelectResponse } from '../hooks/useSqlQuery';
import { SQL } from '../typings';
import Chip from './Chip';
import { Box, Flex } from './Styled';
import Text from './Text';

type Props = {
	data?: SelectResponse<Record<string, unknown>>;
};

const Table: FC<Props> = ({ data }) => {
	const [hiddenFields, setHiddenFields] = useState<Record<number, boolean>>({});

	if (!data) {
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
										`}
									>
										<Box
											py={2}
											px={1}
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
										</Box>
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
								{Object.values(r).map((c, ci) =>
									hiddenFields[ci] ? null : (
										<Box
											as="td"
											key={ci}
											py={2}
											px={1}
											css={css`
												white-space: nowrap;
												border-width: 1px;
												border-top: 0;
												border-bottom: 0;
											`}
										>
											{JSON.stringify(c)}
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
