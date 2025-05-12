'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { atoms } from '@/style/atoms.css'
import { forgotPassword } from 'api/services/auth'
import { ROUTES } from 'parameters'

const SuccessPage = () => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const [countdown, setCountdown] = useState<number>(30)
	const email = searchParams.get('email')
	if (!email) {
		return redirect(ROUTES.NOT_FOUND)
	}

	const onSubmit = async (e: any) => {
		e.preventDefault()
		e.stopPropagation()

		if (email) {
			const result = await forgotPassword(email)

			if (result?.message === 'OK') {
				setCountdown(30)
			}
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(prevCountdown => (prevCountdown === 0 ? prevCountdown : prevCountdown - 1))
		}, 1000)

		// Clean up the interval on component unmount
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<>
			<Stack gap={3}>
				<Heading variant="h3" textTransform="uppercase" textAlign="center">
					{t('Authorization.ForgotPassword.successTitle')}
				</Heading>
				<Box textAlign="center">
					<Text as="span" fontSize="small">
						Link was sent to{' '}
					</Text>
					<Text as="span" fontSize="small" fontWeight="semibold">
						{email}
					</Text>
					<Text as="span" fontSize="small">
						{' '}
						Click on the link. It will redirect you to the page where you can reset your password.
					</Text>
				</Box>
				<Text fontSize="small" textAlign="center">
					If you didn't receive an email, please press the 'resend' button
				</Text>
			</Stack>
			<form className={atoms({ width: '100%' })} onSubmit={onSubmit}>
				<Stack>
					<Button size="large" type="submit" disabled={email === null || countdown !== 0}>
						{countdown === 0 ? t('Authorization.ForgotPassword.resend') : countdown}
					</Button>
				</Stack>
			</form>
		</>
	)
}

export default SuccessPage
