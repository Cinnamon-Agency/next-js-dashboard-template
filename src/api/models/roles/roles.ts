import { UserPermissionEnum, UserRoleEnum } from 'enums/userRoleEnum'

export interface Role {
	id: string
	name: UserRoleEnum
	permissions: Array<UserPermissionEnum>
}
