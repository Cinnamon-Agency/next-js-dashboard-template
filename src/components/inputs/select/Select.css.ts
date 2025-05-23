import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from '@/style/theme.css'

export const select = recipe({
	variants: {
		sizes: {
			large: {
				color: `${tokens.colors['neutral.500']}!important`,
				fontSize: `${tokens.typography.size.medium}!important`,
				fontWeight: tokens.typography.weight.semibold,
				lineHeight: tokens.typography.lineHeight.xlarge
			}
		}
	}
})

export type SelectVariants = RecipeVariants<typeof select>
