import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { Drawer } from '@/components/custom/drawer'
import { Navbar } from '@/components/custom/navbar'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'
import { Metadata } from 'next'
import { ROUTES } from 'parameters'

export const metadata: Metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dashboard'
}

const DashboardLayout = async ({ children }: PropsWithChildren) => {
	const session = await getServerSession(authOptions)
	// This is for protected routes
	if (!session || !session.user.role) {
		return redirect(ROUTES.LOGIN)
	}
	const permissions = session.user.role.permissions

	return (
		<>
			<Drawer permissions={permissions} />
			<Box flex="1">
				<Stack>
					<Navbar />
					<Box display="flex" align="center">
						{children}
					</Box>
				</Stack>
			</Box>
		</>
	)
}

export default DashboardLayout
