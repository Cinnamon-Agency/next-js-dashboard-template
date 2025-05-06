'use client'

import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'

import { Loader } from '@/components/custom/loader/Loader'
import { Box } from '@/components/layout/box'
import { Tabs } from '@/components/navigation/tabs/Tabs'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useNavbarItemsStore } from '@/store/navbar'

import { EmailForm } from './emailForm'
import { PasswordForm } from './passwordForm'
import { PersonalInfoForm } from './personalInfoForm'

interface Props {
	session: Session | null
}

const SettingsTabs = ({ session }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	useNavbarItems({ title: 'Settings' })

	return (
		<Box>
			{navbarIsLoading ? (
				<Loader />
			) : (
				<Tabs size="large">
					<Tabs.Tab value="personalInfo" defaultTab>
						{t('General.personalInfo')}
					</Tabs.Tab>
					<Tabs.Tab value="password">{t('Authorization.password')}</Tabs.Tab>
					<Tabs.Tab value="email">{t('General.email')}</Tabs.Tab>
					<Tabs.Panel value="personalInfo">
						<PersonalInfoForm session={session} />
					</Tabs.Panel>
					<Tabs.Panel value="password">
						<PasswordForm />
					</Tabs.Panel>
					<Tabs.Panel value="email">
						<EmailForm session={session} />
					</Tabs.Panel>
				</Tabs>
			)}
		</Box>
	)
}

export default SettingsTabs
