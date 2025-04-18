import { UserRoleEnum } from 'enums/userRoleEnum'

export interface Admin {
	id: string
	email: string
	fullName: string
	role: UserRoleEnum
	status: 'Active' | 'Inactive'
}
