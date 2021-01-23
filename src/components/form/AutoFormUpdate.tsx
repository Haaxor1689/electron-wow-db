import { useFormikContext } from 'formik';
import { useEffect } from 'react';

const AutoFormUpdate = <T extends Record<string, unknown>>({
	onUpdate,
}: {
	onUpdate: (arg: { values: T }) => void;
}) => {
	const { values } = useFormikContext<T>();
	useEffect(() => {
		console.log('Updated');

		onUpdate({ values });
	}, [onUpdate, values]);
	return null;
};

export default AutoFormUpdate;
