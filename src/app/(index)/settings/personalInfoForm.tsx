'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/inputs/button'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { Box } from '@/components/layout/box'
import { Columns } from '@/components/layout/columns'
import { Divider } from '@/components/layout/divider'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { personal } from 'api/services/settings'
import { requiredString } from 'schemas'
import { signIn, useSession } from 'next-auth/react'
import { ErrorToast } from '@/components/overlay/toast-messages/ErrorToastmessage'

const formSchema = z.object({
	fullName: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

export const PersonalInfoForm = () => {
	const t = useTranslations()

	const { data: session } = useSession()

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: session?.user.name
		}
	})

	const onSubmit = async (data: Schema) => {
		try {
			const result = await personal(data.fullName)
			if (result?.message === 'OK') {
				// update user
				await signIn('login', {
					updateUser: JSON.stringify({ ...session?.user, name: data.fullName }),
					redirect: false
				})

				SuccessToast(t('Settings.personalInfoSuccessfullyUpdated'))
			}
		} catch (error) {
			ErrorToast('Failed to save personal info')
		}
	}

	return (
		<Box paddingTop={6}>
			<Box padding={6} backgroundColor="neutral.50" border="thin" borderColor="neutral.300">
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Stack gap={4}>
							<Columns gap={6}>
								<Columns.Item columns={6}>
									<Box paddingBottom={6}>
										<FormControl name="fullName">
											<FormControl.Label>
												<RequiredLabel>{t('General.fullName')}</RequiredLabel>
											</FormControl.Label>
											<TextInput placeholder={t('General.fullNamePlaceholder')} />
											<FormControl.Message />
										</FormControl>
									</Box>
								</Columns.Item>
							</Columns>
							<Divider />
							<Inline gap={4}>
								<Button variant="secondary" onClick={() => form.reset()}>
									{t('General.reset')}
								</Button>
								<Button type="submit" disabled={!form.formState.isValid}>
									{t('General.saveChanges')}
								</Button>
							</Inline>
						</Stack>
					</form>
				</FormProvider>
			</Box>
		</Box>
	)
}
