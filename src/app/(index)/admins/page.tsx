import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { getAdmins } from 'api/services/admins'

import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { usePermissions } from '@/hooks/usePermissions'
import { handleAdminRoles } from '@/utils/handleAdminRoles'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters'
import { columns } from './columns'
import { Inputs } from './inputs'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const AdminsPage = async ({ searchParams }: Props) => {
	usePermissions({ permission: UserPermissionEnum.ADMIN_READ })

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
			<Inputs data={adminsData?.admins} />
			<DataTable columns={columns} data={handleAdminRoles(adminsData?.admins)} pagination={adminsData?.pagination} />
		</ListWrapper>
	)
}

export default AdminsPage
