import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { formatDate } from '@/utils/formatDate'
import { ReviewParams } from 'api/models/reviews/reviewPayload'
import { Review } from 'api/models/reviews/reviews'
import { getReviews } from 'api/services/reviews'
import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: ReviewParams
}

const ReviewsPage = async ({ searchParams }: Props) => {
	const { data } = await getReviews(searchParams)
	const isInitialListEmpty = (data?.pagination?.count === 0 && !searchParams.status) || data === null

	return isInitialListEmpty ? (
		<NoListData navbarTitle="Reviews" title="Reviews.noListDataTitle" description="Reviews.noListDataDescription" />
	) : (
		<ListWrapper title="Reviews">
			<Inputs data={data?.reviews} />
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
