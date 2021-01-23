import { useFormikContext } from 'formik';
import { useEffect } from 'react';

const AutoFormUpdate = <T extends Record<string, unknown>>({
	onUpdate,
}: {
	onUpdate: (arg: { values: T }) => void;
}) => {
	const { values } = useFormikContext<T>();
	useEffect(() => {
		onUpdate({ values });
	}, [onUpdate, values]);
	return null;
};

export default AutoFormUpdate;
