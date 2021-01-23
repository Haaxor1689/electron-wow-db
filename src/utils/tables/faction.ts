export type Faction = {
	id: number;
	name1: string;
};

export const mapFactionRows = (row: Faction) => ({
	value: row.id,
	label: `${row.name1} (${row.id})`,
});
