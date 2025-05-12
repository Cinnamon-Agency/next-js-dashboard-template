import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { getAdmins } from 'api/services/admins'

import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { handleAdminRoles } from '@/utils/handleAdminRoles'
import { ROUTES } from 'parameters'
import { columns } from './columns'
import { Inputs } from './inputs'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserPermissionEnum } from 'enums/userRoleEnum'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const AdminsPage = async ({ searchParams }: Props) => {
	const session = await getServerSession(authOptions)
	const { data: adminsData } = await getAdmins(searchParams)
	const isInitialListEmpty = (adminsData?.pagination?.count === 0 && !searchParams.search) || adminsData === null

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="Admins"
			title="Admins.noListDataTitle"
			description="Admins.noListDataDescription"
			buttonLabel="Admins.add"
			buttonLink={ROUTES.ADD_ADMINS}
		/>
	) : (
		<ListWrapper title="Admins">
			<Inputs
				data={adminsData?.admins}
				writePermission={session?.user.role.permissions.includes(UserPermissionEnum.ADMIN_WRITE)}
			/>
			<DataTable columns={columns} data={handleAdminRoles(adminsData?.admins)} pagination={adminsData?.pagination} />
		</ListWrapper>
	)
}

export default AdminsPage
