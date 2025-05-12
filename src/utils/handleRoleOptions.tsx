import { Role } from 'api/models/roles/roles'
import { UserRoleEnum } from 'enums/userRoleEnum'

export const handleRoleOptions = (roles: Role[]) => {
	const roleOptions = [{ value: '', label: 'Select role' }]
	const addedOptions = roles
		.filter(({ name }) => ![UserRoleEnum.USER, UserRoleEnum.SUPER_ADMIN].includes(name))
		.map(({ id, permissions, name }) => ({ value: id, label: `${name} - ${permissions.toString()}` }))
	return roleOptions.concat(addedOptions)
}
