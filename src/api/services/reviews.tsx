import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ReviewPayload } from 'api/models/reviews/reviewPayload'

interface Query {
	status: string
	page: number
	limit: number
}

export const getReviews = (query: Query) => {
	const queryParams = {
		status: query.status,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}

	return fetchWithToken(`review`, queryParams)
}

export const getReview = (id: string) => {
	return fetchWithToken(`review/${id}`)
}

export const updateReview = async (review: ReviewPayload) => {
	const response = await axiosInstanceWithToken.put(`/review`, review)

	return response?.data
}
