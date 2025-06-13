import { fetchWithToken } from 'api/instances/FetchWithToken'
import { DataParams } from 'api/models/data/dataPayload'

// replace with your api calls

export const getData = (query: DataParams) => {
	const queryParams = {
		...query,
		page: query.page ?? 1,
		limit: query.limit ?? 10
	}
	return fetchWithToken(`data`, queryParams)
}

export const getDataById = (id: string) => {
	return fetchWithToken(`data/${id}`)
}
