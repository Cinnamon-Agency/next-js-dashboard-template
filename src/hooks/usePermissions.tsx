import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ROUTES } from 'parameters'

interface PermissionsProps {
	permission: UserPermissionEnum
	route: keyof typeof ROUTES
}
export const usePermissions = async ({ permission, route }: PermissionsProps) => {
	const session = await getServerSession(authOptions)
	if (!session?.user.role.permissions?.includes(permission)) {
		return redirect(route)
	}
}
