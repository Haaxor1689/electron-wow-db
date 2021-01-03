/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC } from 'react';

type Props = {
	data: Record<string, unknown>[];
};

const Table: FC<Props> = ({ data }) => (
	<table
		css={css`
			overflow-x: scroll;
		`}
	>
		<thead>
			<tr>
				{Object.keys(data?.[0] ?? {})?.map((k, i) => (
					<th key={i}>{k}</th>
				))}
			</tr>
		</thead>
		<tbody>
			{data.map((r, ri) => (
				<tr key={ri}>
					{Object.values(r).map((c, ci) => (
						<td key={ci}>{JSON.stringify(c)}</td>
					))}
				</tr>
			))}
		</tbody>
	</table>
);

export default Table;
