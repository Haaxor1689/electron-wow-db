import { TabMetaType } from './tabs';

const formToSql = <T extends Record<string, unknown>>(
	meta: Required<Pick<TabMetaType, 'table' | 'key'>>,
	form: T,
	initial?: T
) => {
	const values = Object.entries(form).filter(
		([col, val]) => val !== initial?.[col]
	);

	if (values.length <= 0) {
		return '';
	}

	return !form[meta.key]
		? `INSERT INTO \`${meta.table}\` (${values
				.map(([col]) => `\`${col}\``)
				.join(', ')}) VALUES (${values
				.map(([, val]) => JSON.stringify(val))
				.join(', ')})`
		: `UPDATE \`${meta.table}\` SET ${values
				.map(([col, val]) => `\`${col}\` = ${JSON.stringify(val)}`)
				.join(', ')} WHERE \`${meta.key}\` = ${form[meta.key]}`;
};

export default formToSql;
