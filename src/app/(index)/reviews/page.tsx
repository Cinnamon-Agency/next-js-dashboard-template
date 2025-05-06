import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { usePermissions } from '@/hooks/usePermissions'
import { UserPermissionEnum } from 'enums/userRoleEnum'

import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { getReviews } from 'api/services/reviews'
import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		status: string
		page: number
		limit: number
	}
}

const ReviewsPage = async ({ searchParams }: Props) => {
	usePermissions({ permission: UserPermissionEnum.REVIEW_READ })

	const { data } = await getReviews(searchParams)
	const isInitialListEmpty = (data?.pagination?.count === 0 && !searchParams.status) || data === null

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.reviews"
			title="Reviews.noListDataTitle"
			description="Reviews.noListDataDescription"
		/>
	) : (
		<ListWrapper title="General.reviews">
			<Inputs data={data?.reviews} />
			<DataTable columns={columns} data={data?.reviews} pagination={data?.pagination} />
		</ListWrapper>
	)
}
export default ReviewsPage
