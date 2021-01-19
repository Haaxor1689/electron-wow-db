import { useEffect, useState } from 'react';
import fs from 'fs';

type DbcHeader = {
	/* uint32_t */ magic: number; // always 'WDBC'
	/* uint32_t */ record_count: number; // records per file
	/* uint32_t */ field_count: number; // fields per record
	/* uint32_t */ record_size: number; // sum (sizeof (field_type_i)) | 0 <= i < field_count. field_type_i is NOT defined in the files.
	/* uint32_t */ string_block_size: number;
};

type Dbc = {
	header: DbcHeader;
	attrs: string[];
};

const useDbcFile = (filename: string) => {
	const [data, setData] = useState<Dbc>();
	useEffect(() => {
		if (!filename) {
			setData(undefined);
			return;
		}

		const buffer = fs.readFileSync(filename);
		const header: DbcHeader = {
			magic: buffer.readUInt32LE(0),
			record_count: buffer.readUInt32LE(4),
			field_count: buffer.readUInt32LE(8),
			record_size: buffer.readUInt32LE(16),
			string_block_size: buffer.readUInt32LE(20),
		};
		// const attrs = [...Array(header.field_count).keys()].map(i => )
		setData({ header, attrs: [] });
	}, [filename]);
	return data;
};
export default useDbcFile;
