export type CreatureTemplate = {
	entry: number;
	patch: number;
	display_id1: number;
	display_id2: number;
	display_id3: number;
	display_id4: number;
	name: string;
	subname: string | null;
	gossip_menu_id: number;
	level_min: number;
	level_max: number;
	health_min: number;
	health_max: number;
	mana_min: number;
	mana_max: number;
	armor: number;
	faction: number;
	npc_flags: number;
	speed_walk: number;
	speed_run: number;
	scale: number;
	detection_range: number;
	call_for_help_range: number;
	leash_range: number;
	rank: number;
	xp_multiplier: number;
	dmg_min: number;
	dmg_max: number;
	dmg_school: number;
	attack_power: number;
	dmg_multiplier: number;
	base_attack_time: number;
	ranged_attack_time: number;
	unit_class: number;
	unit_flags: number;
	dynamic_flags: number;
	beast_family: number;
	trainer_type: number;
	trainer_spell: number;
	trainer_class: number;
	trainer_race: number;
	ranged_dmg_min: number;
	ranged_dmg_max: number;
	ranged_attack_power: number;
	type: number;
	type_flags: number;
	loot_id: number;
	pickpocket_loot_id: number;
	skinning_loot_id: number;
	holy_res: number;
	fire_res: number;
	nature_res: number;
	frost_res: number;
	shadow_res: number;
	arcane_res: number;
	spell_id1: number;
	spell_id2: number;
	spell_id3: number;
	spell_id4: number;
	spell_list_id: number;
	pet_spell_list_id: number;
	gold_min: number;
	gold_max: number;
	ai_name: string;
	movement_type: number;
	inhabit_type: number;
	civilian: number;
	racial_leader: number;
	regeneration: number;
	equipment_id: number;
	trainer_id: number;
	vendor_id: number;
	mechanic_immune_mask: number;
	school_immune_mask: number;
	flags_extra: number;
	script_name: string;
};

export const InitialCreatureTemplate = (): Omit<CreatureTemplate, 'entry'> => ({
	patch: 0,
	display_id1: 0,
	display_id2: 0,
	display_id3: 0,
	display_id4: 0,
	name: '',
	subname: null,
	gossip_menu_id: 0,
	level_min: 0,
	level_max: 0,
	health_min: 0,
	health_max: 0,
	mana_min: 0,
	mana_max: 0,
	armor: 0,
	faction: 0,
	npc_flags: 0,
	speed_walk: 0,
	speed_run: 0,
	scale: 0,
	detection_range: 0,
	call_for_help_range: 0,
	leash_range: 0,
	rank: 0,
	xp_multiplier: 0,
	dmg_min: 0,
	dmg_max: 0,
	dmg_school: 0,
	attack_power: 0,
	dmg_multiplier: 0,
	base_attack_time: 0,
	ranged_attack_time: 0,
	unit_class: 0,
	unit_flags: 0,
	dynamic_flags: 0,
	beast_family: 0,
	trainer_type: 0,
	trainer_spell: 0,
	trainer_class: 0,
	trainer_race: 0,
	ranged_dmg_min: 0,
	ranged_dmg_max: 0,
	ranged_attack_power: 0,
	type: 0,
	type_flags: 0,
	loot_id: 0,
	pickpocket_loot_id: 0,
	skinning_loot_id: 0,
	holy_res: 0,
	fire_res: 0,
	nature_res: 0,
	frost_res: 0,
	shadow_res: 0,
	arcane_res: 0,
	spell_id1: 0,
	spell_id2: 0,
	spell_id3: 0,
	spell_id4: 0,
	spell_list_id: 0,
	pet_spell_list_id: 0,
	gold_min: 0,
	gold_max: 0,
	ai_name: '',
	movement_type: 0,
	inhabit_type: 0,
	civilian: 0,
	racial_leader: 0,
	regeneration: 0,
	equipment_id: 0,
	trainer_id: 0,
	vendor_id: 0,
	mechanic_immune_mask: 0,
	school_immune_mask: 0,
	flags_extra: 0,
	script_name: '',
});

export enum NPCFlags {
	NONE = 0x00000000,
	GOSSIP = 0x00000001, // 100%
	QUESTGIVER = 0x00000002, // 100%
	VENDOR = 0x00000004, // 100%
	FLIGHTMASTER = 0x00000008, // 100%
	TRAINER = 0x00000010, // 100%
	SPIRITHEALER = 0x00000020, // guessed
	SPIRITGUIDE = 0x00000040, // guessed
	INNKEEPER = 0x00000080, // 100%
	BANKER = 0x00000100, // 100%
	PETITIONER = 0x00000200, // 100% 0xC0000 = guild petitions
	TABARDDESIGNER = 0x00000400, // 100%
	BATTLEMASTER = 0x00000800, // 100%
	AUCTIONEER = 0x00001000, // 100%
	STABLEMASTER = 0x00002000, // 100%
	REPAIR = 0x00004000, // 100%
	OUTDOORPVP = 0x20000000, // custom flag for outdoor pvp creatures || Custom flag
}
