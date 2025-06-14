import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from 'style/theme.css'

export const badge = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		gap: tokens.spacing[1],
		padding: `${tokens.spacing[1]} ${tokens.spacing[3]}`,
		fontSize: tokens.typography.size.xsmall,
		fontWeight: tokens.typography.weight.bold,
		lineHeight: tokens.typography.lineHeight.small,
		borderRadius: tokens.borders.radius.large
	},
	variants: {
		variant: {
			default: {
				color: tokens.colors['neutral.700'],
				background: tokens.colors['neutral.100']
			},
			draft: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			hidden: {
				color: tokens.colors['destructive.700'],
				background: tokens.colors['destructive.100']
			}
		}
	},
	defaultVariants: {
		variant: 'draft'
	}
})

export type BadgeVariants = RecipeVariants<typeof badge>
