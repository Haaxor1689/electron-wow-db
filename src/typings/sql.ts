// eslint-disable-next-line import/prefer-default-export
export enum FieldFlags {
	NOT_NULL_FLAG = 1 /** < Field can't be NULL */,
	PRI_KEY_FLAG = 2 /** < Field is part of a primary key */,
	UNIQUE_KEY_FLAG = 4 /** < Field is part of a unique key */,
	MULTIPLE_KEY_FLAG = 8 /** < Field is part of a key */,
	BLOB_FLAG = 16 /** < Field is a blob */,
	UNSIGNED_FLAG = 32 /** < Field is unsigned */,
	ZEROFILL_FLAG = 64 /** < Field is zerofill */,
	BINARY_FLAG = 128 /** < Field is binary   */,
	ENUM_FLAG = 256 /** < field is an enum */,
	AUTO_INCREMENT_FLAG = 512 /** < field is a autoincrement field */,
	TIMESTAMP_FLAG = 1024 /** < Field is a timestamp */,
	SET_FLAG = 2048 /** < field is a set */,
	NO_DEFAULT_VALUE_FLAG = 4096 /** < Field doesn't have default value */,
	ON_UPDATE_NOW_FLAG = 8192 /** < Field is set to NOW on UPDATE */,
	NUM_FLAG = 32768 /** < Field is num (for clients) */,
	PART_KEY_FLAG = 16384 /** < Intern; Part of some key */,
	GROUP_FLAG = 32768 /** < Intern: Group field */,
}

export const isPrimaryKey = (flags: number) =>
	!!(flags & FieldFlags.PRI_KEY_FLAG);

export type OrderBy = [string, 'ASC' | 'DESC'];
