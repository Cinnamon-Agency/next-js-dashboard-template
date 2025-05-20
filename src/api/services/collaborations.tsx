import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'
import { fetchWithToken } from 'api/instances/FetchWithToken'
import { CollaborationCancellationPayload, CollaborationParams } from 'api/models/collaborations/collaborationsPayload'

export const getCollaborations = (query: CollaborationParams) => {
	const queryParams = {
		...query,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}
	return fetchWithToken(`collaboration`, queryParams)
}

export const getCollaboration = (id: string) => {
	return fetchWithToken(`collaboration/${id}`)
}

export const updateCollaborationCancellationStatus = async ({
	collaborationId,
	...rest
}: CollaborationCancellationPayload) => {
	const response = await axiosInstanceWithToken.put(`/collaboration/${collaborationId}/cancel`, rest)

	return response?.data
}
