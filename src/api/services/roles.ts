import { fetchWithToken } from 'api/instances/FetchWithToken'

export const getRoles = () => {
	return fetchWithToken(`admin/roles`)
}
