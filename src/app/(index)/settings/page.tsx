import { getServerSession } from 'next-auth/next'

import { Box } from '@/components/layout/box'
import { authOptions } from 'app/api/auth/[...nextauth]/auth'

import SettingsTabs from './settingsTabs'

async function SettingsPage() {
	const session = await getServerSession(authOptions)

	return (
		<Box paddingTop={8} paddingX={10} width="100%">
			<Box style={{ maxWidth: '60rem' }}>
				<SettingsTabs session={session} />
			</Box>
		</Box>
	)
}

export default SettingsPage
