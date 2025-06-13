import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'

import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataParams } from 'api/models/data/dataPayload'
import { getData } from 'api/services/data'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { getServerSession } from 'next-auth'
import { columns } from './columns'
import { Inputs } from './inputs'
import { formatDate } from '@/utils/formatDate'
import { Data } from 'api/models/data/data'

interface Props {
	searchParams: DataParams
}

const DataPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions)

	const { data } = await getData(searchParams)
	const isInitialListEmpty = data?.pagination?.count === 0 || data === null
	const transformedData = data?.data.map(({ createdAt, ...rest }: Data) => ({
		...rest,
		createdAt: formatDate(createdAt)
	}))

	return (
		<ListWrapper title="Data">
			<Inputs
				data={data?.data}
				writePermission={session?.user.role.permissions.includes(UserPermissionEnum.DATA_WRITE)}
			/>
			{isInitialListEmpty ? (
				<NoListData navbarTitle="Data" title="Data.noListDataTitle" description="Data.noListDataDescription" />
			) : (
				<DataTable columns={columns} data={transformedData} pagination={data?.pagination} linkToSinglePage />
			)}
		</ListWrapper>
	)
}
export default DataPage
