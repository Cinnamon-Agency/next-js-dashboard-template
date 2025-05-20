import type { ColumnDef } from '@tanstack/react-table'
import { Collaboration } from 'api/models/collaborations/collaborations'

export const columns: Array<ColumnDef<Collaboration>> = [
	{ accessorKey: 'status', header: 'Collaborations.status' },
	{ accessorKey: 'reasonToCollaborate', header: 'Collaborations.reasonToCollaborate' },
	{ accessorKey: 'createdAt', header: 'Collaborations.createdAt' },
	{ accessorKey: 'inDeadline', header: 'Collaborations.inDeadline' },
	{ accessorKey: 'type', header: 'Collaborations.type' },
	{ accessorKey: 'owner.email', header: 'Collaborations.owner' },
	{ accessorKey: 'collaborator.email', header: 'Collaborations.collaborator' },
	{ accessorKey: 'cancellation.status', header: 'Collaborations.cancellationStatus' },
	{ accessorKey: 'cancellation.reason', header: 'Collaborations.cancellationReason' },
	{ accessorKey: 'cancellation.adminComment', header: 'Collaborations.cancellationAdminComment' },
	{ accessorKey: 'cancellation.collaboratorComment', header: 'Collaborations.cancellationCollaboratorComment' }
]
