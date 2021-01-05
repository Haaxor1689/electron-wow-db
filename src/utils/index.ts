// eslint-disable-next-line import/prefer-default-export
export const compare = <T extends unknown>(lhs: T, rhs: T) => {
	if (typeof lhs === 'string' && typeof rhs === 'string') {
		return lhs.localeCompare(rhs);
	}
	if (typeof lhs === 'number' && typeof rhs === 'number') {
		return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
	}
	return 0;
};
