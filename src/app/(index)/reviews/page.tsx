import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { formatDate } from '@/utils/formatDate'
import { ReviewParams } from 'api/models/reviews/reviewPayload'
import { Review } from 'api/models/reviews/reviews'
import { getReviews } from 'api/services/reviews'
import { columns } from './columns'
import { Inputs } from './inputs'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserPermissionEnum } from 'enums/userRoleEnum'

interface Props {
	searchParams: ReviewParams
}

const ReviewsPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions)

	const { data } = await getReviews(searchParams)
	const isInitialListEmpty = (data?.pagination?.count === 0 && !searchParams.status) || data === null

	return isInitialListEmpty ? (
		<NoListData navbarTitle="Reviews" title="Reviews.noListDataTitle" description="Reviews.noListDataDescription" />
	) : (
		<ListWrapper title="Reviews">
			<Inputs
				data={data?.reviews}
				writePermission={session?.user.role.permissions.includes(UserPermissionEnum.REVIEW_WRITE)}
			/>
			<DataTable
				columns={columns}
				data={data?.reviews.map(({ time, ...rest }: Review) => ({
					...rest,
					time: formatDate(time)
				}))}
				pagination={data?.pagination}
				linkToSinglePage
			/>
		</ListWrapper>
	)
}
export default ReviewsPage
