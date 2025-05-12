import { getReview } from 'api/services/reviews'

import ReviewEdit from './ReviewEdit'

interface Props {
	params: { id: string }
}

const ReviewsEditPage = async ({ params }: Props) => {
	const { data } = await getReview(params.id)

	return <ReviewEdit review={data.review} />
}

export default ReviewsEditPage
