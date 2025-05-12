export interface Review {
	id: string
	reviewerName: string
	reviewerId: string
	comment: string
	communication: number
	expertise: number
	reliability: number
	time: string
	status: ReviewStatus
}

export enum ReviewStatus {
	Pending = 'Pending',
	Approved = 'Approved',
	Rejected = 'Rejected'
}
