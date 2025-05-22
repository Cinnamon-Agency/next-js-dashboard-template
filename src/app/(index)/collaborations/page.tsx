import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { CollaborationParams } from 'api/models/collaborations/collaborationsPayload'
import { getCollaborations } from 'api/services/collaborations'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { getServerSession } from 'next-auth'
import { columns } from './columns'
import { Inputs } from './inputs'
import { formatDate } from '@/utils/formatDate'
import { Collaboration } from 'api/models/collaborations/collaborations'

interface Props {
	searchParams: CollaborationParams
}

const CollaborationsPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions)

	const { data } = await getCollaborations(searchParams)
	const isInitialListEmpty = data?.pagination?.count === 0 || data === null
	const transformedData = data?.collaborations.map(({ createdAt, inDeadline, ...rest }: Collaboration) => ({
		...rest,
		createdAt: formatDate(createdAt),
		inDeadline: inDeadline ? 'Yes' : 'No'
	}))

	return (
		<ListWrapper title="Collaborations">
			<Inputs
				data={data?.collaborations}
				writePermission={session?.user.role.permissions.includes(UserPermissionEnum.COLLABORATION_WRITE)}
			/>
			{isInitialListEmpty ? (
				<NoListData
					navbarTitle="Collaborations"
					title="Collaborations.noListDataTitle"
					description="Collaborations.noListDataDescription"
				/>
			) : (
				<DataTable columns={columns} data={transformedData} pagination={data?.pagination} linkToSinglePage />
			)}
		</ListWrapper>
	)
}
export default CollaborationsPage
