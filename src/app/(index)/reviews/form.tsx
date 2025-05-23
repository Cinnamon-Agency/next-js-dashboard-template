'use client'

import { Text } from '@/components/typography/text'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Select } from '@/components/inputs/select'
import { Stack } from '@/components/layout/stack'
import { OpenedProps } from '@/hooks/use-toggle'
import { formatDate } from '@/utils/formatDate'
import { handleReviewStatusOptions } from '@/utils/handleOptions'
import { Review } from 'api/models/reviews/reviews'
interface Props {
	review: Review
	cancelDialog?: OpenedProps
}

const ReviewForm = ({ review, cancelDialog }: Props) => {
	const details = [
		{ label: 'Reviewer name', value: review.reviewerName },
		{ label: 'Time', value: formatDate(review.time) },
		{ label: 'Comment', value: review.comment },
		{ label: 'Communication', value: review.communication },
		{ label: 'Expertise', value: review.expertise },
		{ label: 'Reliability', value: review.reliability }
	]

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			{details.map(({ label, value }) => (
				<Stack gap={4} key={label}>
					<Label>{label}</Label>
					<Text fontSize="small" color="neutral.800">
						{value ?? 'No data'}
					</Text>
				</Stack>
			))}
			<FormControl name="status">
				<FormControl.Label>
					<RequiredLabel>Review status</RequiredLabel>
				</FormControl.Label>
				<Select options={handleReviewStatusOptions({ omitDefaultLabel: true })} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default ReviewForm
