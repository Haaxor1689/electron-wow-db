/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import { FaKey } from 'react-icons/fa';
import { SelectResponse } from '../hooks/useSqlQuery';
import { SQL } from '../typings';
import { Box } from './Styled';
import Text from './Text';

type Props = {
	data?: SelectResponse<Record<string, unknown>>;
};

const Table: FC<Props> = ({ data }) => {
	if (!data) {
		return (
			<Text textAlign="center" fontStyle="italic" opacity={0.5}>
				No results
			</Text>
		);
	}
	return (
		<Box
			maxHeight="80vh"
			css={css`
				overflow: auto;
			`}
		>
			<table
				css={css`
					border-collapse: collapse;
				`}
			>
				<thead>
					<tr>
						{data.fields.map((k, i) => (
							<Box
								key={i}
								as="th"
								bg="bgGrey"
								fontWeight="normal"
								py={2}
								px={1}
								minWidth={100}
								textAlign="left"
								title={Object.entries(SQL.FieldFlags)
									.filter((e) => typeof e[1] === 'number')
									// eslint-disable-next-line no-bitwise
									.filter((e) => k.flags & (e[1] as never))
									.map((e) => e[0])
									.join(', ')}
								css={css`
									border-width: 1px;
									white-space: nowrap;
								`}
							>
								{/* eslint-disable-next-line no-bitwise */}
								{k.flags & SQL.FieldFlags.PRI_KEY_FLAG ? (
									<Box as={FaKey} fontSize="sm" mr={1} />
								) : null}
								<Text as="span">{k.name}</Text>
							</Box>
						))}
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
							{Object.values(r).map((c, ci) => (
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
							))}
						</tr>
					))}
				</tbody>
			</table>
		</Box>
	);
};

export default Table;
