import { Role } from 'api/models/roles/roles'
import { UserRoleEnum } from 'enums/userRoleEnum'

interface OptionParams {
	omitDefaultLabel?: boolean
}

export const handleRoleOptions = (roles: Role[], params?: OptionParams) => {
	const transformedArray = roles
		.filter(({ name }) => ![UserRoleEnum.USER, UserRoleEnum.SUPER_ADMIN].includes(name))
		.map(({ id, permissions, name }) => ({ value: id, label: `${name} - ${permissions.toString()}` }))
	return params?.omitDefaultLabel ? transformedArray : [{ value: '', label: 'Select role' }, ...transformedArray]
}
