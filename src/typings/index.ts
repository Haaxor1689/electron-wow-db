import { Key } from 'react';
import { BoxProps } from '../components/Styled';

export * as DB from './db';
export * as SQL from './sql';

export type InputProps<Key extends string, Input extends HTMLElement> = {
	variant?: 'lg';
	name: Key;
} & Omit<React.HTMLProps<Input>, 'as'> &
	BoxProps;

export type SelectOption = { value: Key; label: string };
