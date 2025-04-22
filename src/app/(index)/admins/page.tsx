import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { getAdmins } from 'api/services/admins'

import { usePermissions } from '@/hooks/usePermissions'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters'
import { columns } from './columns'
import { Inputs } from './inputs'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'

interface Props {
	searchParams: {
		search: string
		page: number
		limit: number
	}
}

const AdminsPage = async ({ searchParams }: Props) => {
	usePermissions({ permission: UserPermissionEnum.ADMIN_READ, route: ROUTES.REVIEWS as keyof typeof ROUTES })

	const { data: adminsData } = await getAdmins(searchParams)
	const isInitialListEmpty = (adminsData?.pagination?.count === 0 && !searchParams.search) || adminsData === null

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.admins"
			title="Admins.noListDataTitle"
			description="Admins.noListDataDescription"
			buttonLabel="Admins.add"
			buttonLink={ROUTES.ADD_ADMINS}
		/>
	) : (
		<ListWrapper title="General.admins">
			<Inputs data={adminsData?.admins} />
			<DataTable
				columns={columns}
				data={replaceNullInListWithDash(adminsData?.admins)}
				pagination={adminsData?.pagination}
			/>
		</ListWrapper>
	)
}

export default AdminsPage
