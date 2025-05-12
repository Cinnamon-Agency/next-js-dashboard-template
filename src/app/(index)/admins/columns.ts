import type { ColumnDef } from '@tanstack/react-table'
import { TableAdmin } from 'api/models/admin/admin'

export const columns: Array<ColumnDef<TableAdmin>> = [
	{ accessorKey: 'fullName', header: 'General.fullName' },
	{ accessorKey: 'email', header: 'General.email' },
	{ accessorKey: 'status', header: 'General.status' },
	{ accessorKey: 'role', header: 'General.role' },
	{ accessorKey: 'permissions', header: 'General.permissions' }
]
