import type { ColumnDef } from '@tanstack/react-table'
import { Admin } from 'api/models/admin/admin'

export const columns: Array<ColumnDef<Admin>> = [
	{ accessorKey: 'fullName', header: 'General.fullName' },
	{ accessorKey: 'email', header: 'General.email' },
	{ accessorKey: 'active', header: 'General.active' },
	{ accessorKey: 'role', header: 'General.role' }
]
