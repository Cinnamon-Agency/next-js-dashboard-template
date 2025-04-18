import { ListWrapper } from '@/components/custom/layouts'
import { DataTable } from '@/components/data-display/data-table'
import { getAdmins } from 'api/services/admins'

import { usePermissions } from '@/hooks/usePermissions'
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
	usePermissions({ permission: UserPermissionEnum.ADMIN_READ, route: ROUTES.REVIEWS as keyof typeof ROUTES })

	const { data: adminsData } = await getAdmins(searchParams)
	// const isInitialListEmpty = (adminsData?.pagination?.count === 0 && !searchParams.search) || adminsData === null
	// const transformedAdminArray = adminsData?.users?.map((admin: any) => {
	// 	return {
	// 		...admin,
	// 		id: admin.userId
	// 	}
	// })

	// return isInitialListEmpty ? (
	// 	<NoListData
	// 		navbarTitle="General.admins"
	// 		title="Admins.noListDataTitle"
	// 		description="Admins.noListDataDescription"
	// 		buttonLabel="Admins.add"
	// 		buttonLink={ROUTES.ADD_ADMINS}
	// 	/>
	// ) : (
	// 	<ListWrapper title="General.admins">
	// 		<Inputs data={adminsData?.users} />
	// 		<DataTable
	// 			columns={columns}
	// 			data={replaceNullInListWithDash(transformedAdminArray)}
	// 			pagination={adminsData?.pagination}
	// 		/>
	// 	</ListWrapper>
	// )

	return (
		<ListWrapper title="General.admins">
			<Inputs data={adminsData?.admins} />
			{/* todo pagination */}
			<DataTable columns={columns} data={adminsData?.admins} pagination={{ count: 0, page: 0, limit: 0 }} />
		</ListWrapper>
	)
}

export default AdminsPage
