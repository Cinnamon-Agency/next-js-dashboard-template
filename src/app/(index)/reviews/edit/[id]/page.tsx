import { getReview } from 'api/services/reviews'

import ReviewEdit from './ReviewEdit'
import { usePermissions } from '@/hooks/usePermissions'
import { UserPermissionEnum } from 'enums/userRoleEnum'

interface Props {
	params: { id: string }
}

const ReviewsEditPage = async ({ params }: Props) => {
	usePermissions({ permission: UserPermissionEnum.REVIEW_WRITE })
	const { data } = await getReview(params.id)

	return <ReviewEdit review={data.review} />
}

export default ReviewsEditPage
