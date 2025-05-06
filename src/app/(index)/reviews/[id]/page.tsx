import { getReview } from 'api/services/reviews'
import { ReviewDetails } from './ReviewDetails'

interface Props {
	params: { id: string }
}

const ReviewDetailsPage = async ({ params }: Props) => {
	const { data } = await getReview(params.id)

	return <ReviewDetails review={data.review} />
}

export default ReviewDetailsPage
