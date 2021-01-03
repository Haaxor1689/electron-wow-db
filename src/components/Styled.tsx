import {
	color,
	ColorProps,
	compose,
	flexbox,
	FlexboxProps,
	grid,
	GridProps as GridPropsSS,
	layout,
	LayoutProps,
	space,
	SpaceProps,
	position,
	PositionProps,
	TypographyProps,
	typography,
	ShadowProps,
	shadow,
	flex,
	flexGrow,
	flexShrink,
	flexBasis,
	justifySelf,
	alignSelf,
	order,
	gridColumn,
	gridRow,
	gridArea,
	justifyItems,
	alignItems,
	justifyContent,
	alignContent,
	styleFn,
} from 'styled-system';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

type FlexSelfProps = Pick<
	FlexboxProps,
	| 'flex'
	| 'flexGrow'
	| 'flexShrink'
	| 'flexBasis'
	| 'justifySelf'
	| 'alignSelf'
	| 'order'
>;
type GridSelfProps = Pick<GridPropsSS, 'gridColumn' | 'gridRow' | 'gridArea'>;
type GridAlignProps = Pick<
	FlexboxProps,
	'justifyItems' | 'alignItems' | 'justifyContent' | 'alignContent'
>;

type SSProps = SpaceProps &
	ColorProps &
	LayoutProps &
	FlexSelfProps &
	GridSelfProps &
	PositionProps &
	TypographyProps &
	ShadowProps;

export type BoxProps = Omit<SSProps, 'color'>;

export const ComposeBox = (...styles: styleFn[]) =>
	compose(
		space,
		color,
		layout,
		flex,
		flexGrow,
		flexShrink,
		flexBasis,
		justifySelf,
		alignSelf,
		order,
		gridColumn,
		gridRow,
		gridArea,
		position,
		typography,
		shadow,
		...styles
	);

export const Box = styled('div', {
	shouldForwardProp: isPropValid,
})<BoxProps>`
	${ComposeBox()}
`;
Box.defaultProps = {
	minWidth: 0,
};

export const ComposeFlex = (...styles: styleFn[]) =>
	ComposeBox(flexbox, ...styles);

export type FlexProps = BoxProps & FlexboxProps;
export const Flex = styled.div<FlexProps>`
	${ComposeFlex()}
	display: flex;
`;

export const ComposeGrid = (...styles: styleFn[]) =>
	ComposeBox(
		grid,
		justifyItems,
		alignItems,
		justifyContent,
		alignContent,
		...styles
	);

export type GridProps = BoxProps & GridPropsSS & GridAlignProps;
export const Grid = styled.div<GridProps>`
	${ComposeGrid()}
	display: grid;
`;
