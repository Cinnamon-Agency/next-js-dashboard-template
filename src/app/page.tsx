import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters/routes'

const HomePage = async () => {
	const session = await getServerSession(authOptions)
	if (session === null) {
		return redirect(ROUTES.LOGIN)
	}

	const userRole = session?.user?.roles[0]?.name

	switch (userRole) {
		case UserRoleEnum.SUPER_ADMIN:
			return redirect(ROUTES.REVIEWS)
		case UserRoleEnum.ADMIN:
		default:
			return redirect(ROUTES.ADMINS)
	}
}

export default HomePage
