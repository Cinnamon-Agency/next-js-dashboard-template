export interface Collaboration {
	id: string
	amount: number
	status: CollaborationStatus
	reasonToCollaborate: string
	inDeadline: boolean
	type: CollaborationType
	createdAt: string
	cancellation: {
		requestedById: string
		status: CollaborationCancellationStatus
		reason: string
		adminComment: string | null
		collaboratorComment: string | null
	}
	owner: {
		id: string
		fullName: string
		email: string
	}
	collaborator: {
		id: string
		fullName: string
		email: string
	}
}

export enum CollaborationType {
	COLLABORATION = 'COLLABORATION',
	SEEKING_HELP = 'SEEKING_HELP'
}

export enum CollaborationStatus {
	ACTIVE = 'ACTIVE',
	PAST = 'PAST',
	PENDING_TERMINATION = 'PENDING_TERMINATION'
}

export enum CollaborationCancellationStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED'
}
