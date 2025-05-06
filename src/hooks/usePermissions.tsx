import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ROUTES } from 'parameters'

interface PermissionsProps {
	permission: UserPermissionEnum
}
export const usePermissions = async ({ permission }: PermissionsProps) => {
	const session = await getServerSession(authOptions)
	if (!session?.user.role.permissions?.includes(permission)) {
		return redirect(ROUTES.NOT_FOUND)
	}
}
