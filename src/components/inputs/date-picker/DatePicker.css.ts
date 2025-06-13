import { tokens } from '@/style/theme.css'
import { style } from '@vanilla-extract/css'

const activeBorder = { borderColor: tokens.colors['primary.300'], boxShadow: tokens.shadows.xlarge }

export const input = style({
	height: '2.5rem',
	outline: 'none',
	border: `1px solid ${tokens.colors['neutral.300']}`,
	fontSize: tokens.typography.size.small,
	fontWeight: tokens.typography.weight.bold,
	lineHeight: tokens.typography.lineHeight.medium,
	borderRadius: tokens.borders.radius.small,
	paddingLeft: tokens.spacing[3],
	paddingRight: tokens.spacing[3],
	backgroundColor: tokens.colors['shades.00'],
	color: tokens.colors['neutral.500'],

	':focus': activeBorder,
	':hover': activeBorder,
	':active': activeBorder
})
