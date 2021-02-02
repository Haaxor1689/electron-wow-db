export type FactionTemplate = {
	id: number;
	build: number;
	faction_id: number;
	faction_flags: number;
	our_mask: number;
	friendly_mask: number;
	hostile_mask: number;
	enemy_faction1: number;
	enemy_faction2: number;
	enemy_faction3: number;
	enemy_faction4: number;
	friend_faction1: number;
	friend_faction2: number;
	friend_faction3: number;
	friend_faction4: number;
};

export type NamedFactionTemplate = {
	id: number;
	name1: string;
	faction_id: number;
};

export const SelectNamedFactionTemplate =
	'SELECT faction_template.id, faction.name1, faction.id as faction_id FROM faction_template LEFT JOIN faction ON faction_template.faction_id = faction.id;';

export const mapNamedFactionTemplateToRows = (row: NamedFactionTemplate) => ({
	value: row.id,
	label: `${row.name1}:${row.faction_id} (${row.id})`,
});
