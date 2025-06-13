import { Role } from '../roles/roles'

export interface UserData {
	id?: string
	name?: string
	email?: string
	role: Role
}
