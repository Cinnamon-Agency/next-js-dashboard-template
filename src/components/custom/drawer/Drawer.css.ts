import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

const selected = { backgroundColor: tokens.colors['neutral.100'] }

export const drawer = style({
	padding: `${tokens.spacing[12]} ${tokens.spacing[4]} ${tokens.spacing[8]}`,
	backgroundColor: tokens.colors['neutral.50'],
	borderRight: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	zIndex: tokens.indices.over
})

export const drawerItem = style({
	color: tokens.colors['neutral.800'],
	padding: `${tokens.spacing[1]}`,
	borderRadius: tokens.borders.radius.xsmall,
	':hover': selected
})

export const drawerItemSelected = style({
	color: tokens.colors['neutral.900'],
	...selected
})
