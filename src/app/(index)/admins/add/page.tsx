import { usePermissions } from '@/hooks/usePermissions'
import AdminAdd from './AdminAdd'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { getRoles } from 'api/services/roles'

const AdminAddPage = async () => {
	usePermissions({ permission: UserPermissionEnum.ADMIN_WRITE })
	const roleData = await getRoles()

	return <AdminAdd roles={roleData.data.roles} />
}

export default AdminAddPage
