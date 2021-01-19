export type Conditions = {
	condition_entry: number;
	type: number;
	value1: number;
	value2: number;
	value3: number;
	value4: number;
	flags: number;
};

export type CreatureTemplate = {
	entry: number;
	patch: number;
	display_id1: number;
	display_id2: number;
	display_id3: number;
	display_id4: number;
	// TODO: ....
	name: string;
	subname: string | null;
	// TODO: ....
};
