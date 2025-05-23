import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { formatDate } from '@/utils/formatDate'
import { Review } from 'api/models/reviews/reviews'

interface Props {
	review: Review
}

const Details = ({ review }: Props) => {
	const details = [
		{ label: 'Reviewer name', value: review.reviewerName },
		{ label: 'Time', value: formatDate(review.time) },
		{ label: 'Comment', value: review.comment },
		{ label: 'Communication', value: review.communication },
		{ label: 'Expertise', value: review.expertise },
		{ label: 'Reliability', value: review.reliability },
		{ label: 'Status', value: review.status }
	]

	return (
		<DetailsWrapper>
			{details.map(({ label, value }) => (
				<Stack gap={4} key={label}>
					<Label>{label}</Label>
					<Text fontSize="small" color="neutral.800">
						{value ?? 'No data'}
					</Text>
				</Stack>
			))}
		</DetailsWrapper>
	)
}

export default Details
