import { CollaborationCancellationStatus, CollaborationStatus } from './collaborations'

export interface CollaborationParams {
	page: number
	limit: number
	search: string
	status: CollaborationStatus
	date: string
	profileHandle: string
}

export interface CollaborationCancellationPayload {
	collaborationId: string
	collaborationCancellationId: string
	status: CollaborationCancellationStatus
	comment?: string
}
