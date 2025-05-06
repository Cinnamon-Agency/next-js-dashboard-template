import { getAdmin } from 'api/services/admins'

import { usePermissions } from '@/hooks/usePermissions'
import { getRoles } from 'api/services/roles'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import AdminEdit from './AdminEdit'

const AdminEditPage = async ({ params }: { params: { id: string } }) => {
	usePermissions({ permission: UserPermissionEnum.ADMIN_WRITE })
	const roleData = await getRoles()
	const { data } = await getAdmin(params.id)

	return <AdminEdit admin={data.admin} roles={roleData.data.roles} />
}

export default AdminEditPage
