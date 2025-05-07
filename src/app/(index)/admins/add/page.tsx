import { getRoles } from 'api/services/roles'
import AdminAdd from './AdminAdd'

const AdminAddPage = async () => {
	const roleData = await getRoles()

	return <AdminAdd roles={roleData.data.roles} />
}

export default AdminAddPage
