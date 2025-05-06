'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { OpenedProps } from '@/hooks/use-toggle'
import { Review, ReviewStatus } from 'api/models/reviews/reviews'

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
