import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { ReactNode } from 'react'

import { Drawer } from '@/components/custom/drawer'
import { Navbar } from '@/components/custom/navbar'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { ROUTES } from 'parameters'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Collabbro | Dashboard',
	description: 'Collabbro Admin Dashboard'
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	const session = await getServerSession(authOptions)

	// This is for protected routes
	if (!session) {
		return redirect(ROUTES.LOGIN)
	}
	const permissions = session.user.role.permissions

	return (
		<>
			<Drawer permissions={permissions} />
			<Box flex="1">
				<Stack>
					<Navbar session={session} />
					<Box display="flex" align="center">
						{children}
					</Box>
				</Stack>
			</Box>
		</>
	)
}

export default DashboardLayout
