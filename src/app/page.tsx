import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters/routes'

const HomePage = async () => {
	const session = await getServerSession(authOptions)
	if (!session || !session.user.role) {
		return redirect(ROUTES.LOGIN)
	}

	const permissions = session.user.role.permissions

	if (permissions.includes(UserPermissionEnum.REVIEW_READ)) {
		return redirect(ROUTES.REVIEWS)
	} else {
		return redirect(ROUTES.SETTINGS)
	}
}

export default HomePage
