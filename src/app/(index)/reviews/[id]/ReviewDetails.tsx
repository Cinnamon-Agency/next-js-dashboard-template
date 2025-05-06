'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { ROUTES } from 'parameters'
import { Review } from 'api/models/reviews/reviews'
import { formatDate } from '@/utils/formatDate'

interface Props {
	review: Review
}

export const ReviewDetails = ({ review }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: `Review ${review.id}`,
		backLabel: 'Reviews.back',
		actionButton: <EditButton buttonLabel="Reviews.edit" buttonLink={ROUTES.EDIT_REVIEW + review.id} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('Reviews.reviewerName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{review.reviewerName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.comment')}</Label>
				<Text fontSize="small" color="neutral.800">
					{review.comment ?? t('Reviews.comment') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Inline gap={4}>
					<Label>{t('Reviews.communication')}</Label>
				</Inline>
				<Text fontSize="small" color="neutral.800">
					{review.communication ?? t('Reviews.communication') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.expertise')}</Label>
				<Text fontSize="small" color="neutral.800">
					{review.expertise ?? t('Reviews.expertise') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.reliability')}</Label>
				<Text fontSize="small" color="neutral.800">
					{review.reliability ?? t('Reviews.reliability') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.time')}</Label>
				<Text fontSize="small" color="neutral.800">
					{formatDate(review.time)}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.status')}</Label>
				<Text fontSize="small" color="neutral.800">
					{review.status}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
