import type { ColumnDef } from '@tanstack/react-table'
import { Collaboration } from 'api/models/collaborations/collaborations'

export const columns: Array<ColumnDef<Collaboration>> = [
	// todo replace with the actual fields
	{ accessorKey: 'id', header: 'Collaboration.id' }
]
