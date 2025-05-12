export interface ReviewPayload {
	reviewId: string
	status: 'Pending' | 'Approved' | 'Rejected'
}

export interface ReviewParams {
	status: string
	page: number
	limit: number
	search: string
	rating: number
	date: string
}
