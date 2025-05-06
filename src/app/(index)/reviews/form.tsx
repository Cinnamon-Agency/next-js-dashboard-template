'use client'

import { useTranslations } from 'next-intl'
import { Text } from '@/components/typography/text'

import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Stack } from '@/components/layout/stack'
import { OpenedProps } from '@/hooks/use-toggle'
import { Review, ReviewStatus } from 'api/models/reviews/reviews'
import { Label } from '@/components/inputs/label'
import { formatDate } from '@/utils/formatDate'
interface Props {
	review: Review
	cancelDialog?: OpenedProps
}

const ReviewForm = ({ review, cancelDialog }: Props) => {
	const t = useTranslations()
	const transformedStatusArray = Object.keys(ReviewStatus).map(key => ({
		id: key,
		name: key
	}))

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<Stack gap={4}>
				<Label>{t('Reviews.reviewerName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{review.reviewerName}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.time')}</Label>
				<Text fontSize="small" color="neutral.800">
					{formatDate(review.time)}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.comment')}</Label>
				<Text fontSize="small" color="neutral.800">
					{review.comment ?? t('Reviews.comment') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('Reviews.communication')}</Label>
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

			<FormControl name="status">
				<FormControl.Label>
					<RequiredLabel>{t('Reviews.status')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown placeholder="Reviews.status" options={transformedStatusArray} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default ReviewForm
