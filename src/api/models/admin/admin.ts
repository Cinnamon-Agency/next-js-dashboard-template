import { UserRoleEnum } from 'enums/userRoleEnum'
import { Role } from '../roles/roles'

export interface Admin {
	id: string
	email: string
	fullName: string
	role: Role
	status: 'Active' | 'Inactive'
}

export interface TableAdmin {
	id: string
	email: string
	fullName: string
	role: UserRoleEnum
	permissions: string
	status: 'Active' | 'Inactive'
}
