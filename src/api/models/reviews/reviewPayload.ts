import { ReviewStatus } from './reviews'

export interface ReviewPayload {
	reviewId: string
	status: ReviewStatus
	comment: string
}

export interface ReviewBulkPayload {
	reviewIds: string[]
	status: ReviewStatus
	comment: string
}

export interface ReviewParams {
	status: string
	page: number
	limit: number
	search: string
	rating: number
	date: string
}
