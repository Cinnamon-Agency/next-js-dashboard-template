import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { ReviewParams, ReviewPayload } from 'api/models/reviews/reviewPayload'

export const getReviews = (query: ReviewParams) => {
	const queryParams = {
		...query,
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
