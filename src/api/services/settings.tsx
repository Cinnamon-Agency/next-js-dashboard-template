import axiosInstanceWithToken from 'api/instances/AxiosInstanceWithToken'

export const personal = async (fullName: string) => {
	const response = await axiosInstanceWithToken.put(`/user`, {
		fullName
	})
	return response?.data
}

export const password = async (oldPassword: string, newPassword: string) => {
	const response = await axiosInstanceWithToken.put(`/user/password`, { oldPassword, newPassword })

	return response?.data
}

export const email = async (email: string) => {
	const response = await axiosInstanceWithToken.put(`/user/email`, { email })

	return response?.data
}
