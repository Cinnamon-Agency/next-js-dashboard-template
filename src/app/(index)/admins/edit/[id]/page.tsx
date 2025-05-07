import { getAdmin } from 'api/services/admins'

import { getRoles } from 'api/services/roles'
import AdminEdit from './AdminEdit'

const AdminEditPage = async ({ params }: { params: { id: string } }) => {
	const roleData = await getRoles()
	const { data } = await getAdmin(params.id)

	return <AdminEdit admin={data.admin} roles={roleData.data.roles} />
}

export default AdminEditPage
