import type { ColumnDef } from '@tanstack/react-table'
import { Data } from 'api/models/data/data'

export const columns: Array<ColumnDef<Data>> = [
	{ accessorKey: 'name', header: 'Data.name' },
	{ accessorKey: 'createdAt', header: 'Data.createdAt' }
]
