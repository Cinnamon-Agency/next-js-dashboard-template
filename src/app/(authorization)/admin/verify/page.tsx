import { getEmail } from 'api/services/auth'
import Register from './Register'
import { redirect } from 'next/navigation'
import { ROUTES } from 'parameters'

interface Props {
	searchParams: {
		uid: string
	}
}
const VerifyPage = async ({ searchParams }: Props) => {
	const uid = searchParams.uid?.split('/')[0]
	if (!uid) {
		return redirect(ROUTES.NOT_FOUND)
	}
	const response = await getEmail(uid)

	return <Register uid={searchParams.uid} status={response.code} email={response.data} />
}

export default VerifyPage
