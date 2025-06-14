import { ReactNode } from 'react'

import { BrandLogo } from '@/components/custom/brand-logo/BrandLogo'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dashboard'
}

const AuthorizationLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box display="flex" width="100vw" justify="center" align="center">
			<Stack gap={10} alignItems="center">
				<BrandLogo />
				<Box
					backgroundColor="neutral.50"
					boxShadow="medium"
					padding={10}
					borderRadius="small"
					style={{ width: '456px' }}>
					<Stack gap={8} alignItems="center">
						{children}
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}

export default AuthorizationLayout
