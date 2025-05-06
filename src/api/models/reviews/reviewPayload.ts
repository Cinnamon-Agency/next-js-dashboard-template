export interface ReviewPayload {
	id: string
	status: 'Pending' | 'Approved' | 'Rejected'
}
