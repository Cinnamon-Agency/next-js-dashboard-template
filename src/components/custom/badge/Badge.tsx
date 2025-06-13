import { useTranslations } from 'next-intl'

import { Box } from 'components/layout/box'

import { BadgeVariants, badge } from './Badge.css'

interface Props {
	// @ts-expect-error
	variant: BadgeVariants['variants']['variant']
	text: string
}

export const Badge = ({ variant = 'draft', text }: Props) => {
	const t = useTranslations()

	return <Box className={badge({ variant })}>{t(text)}</Box>
}
