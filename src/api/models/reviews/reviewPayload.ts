import { ReviewStatus } from './reviews'

export interface ReviewPayload {
	reviewId: string
	status: ReviewStatus
}

export interface ReviewParams {
	status: string
	page: number
	limit: number
	search: string
	rating: number
	date: string
}
