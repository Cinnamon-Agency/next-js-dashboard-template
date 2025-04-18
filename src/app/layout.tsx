'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Box } from '@/components/layout/box'
import { TokenHandler } from '@/components/utils/tokenHandler/TokenHandler'
import { Inter } from 'next/font/google'
import '@/style/app.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { IntlProvider } from 'next-intl'
import { notFound } from 'next/navigation'

const inter = Inter({
	weight: ['400', '600', '700', '800'],
	subsets: ['latin'],
	variable: '--inter-font'
})
type Props = {
	children: ReactNode
}
const getMessages = async () => {
	try {
		return (await import(`../../messages/en.json`)).default
	} catch (error) {
		return notFound()
	}
}

const RootLayout = async ({ children }: Props) => {
	const messages = await getMessages()

	return (
		<IntlProvider locale="en" messages={messages} timeZone="America/Chicago">
			<SessionProvider>
				<TokenHandler>
					<html lang="en">
						<body className={inter.className}>
							<Box display="flex" height="100vh" backgroundColor="neutral.100">
								{children}
								<ToastContainer />
							</Box>
						</body>
					</html>
				</TokenHandler>
			</SessionProvider>
		</IntlProvider>
	)
}

export default RootLayout
