import { Admin } from 'api/models/admin/admin'

export const handleAdminRoles = (admins: Admin[]) => {
	return admins.map(({ role, ...rest }) => ({
		...rest,
		role: role.name,
		permissions: role.permissions.toString()
	}))
}
