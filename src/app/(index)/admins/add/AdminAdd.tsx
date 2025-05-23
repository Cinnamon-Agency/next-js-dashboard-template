'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { CancelAddDialog } from '@/components/overlay/cancel-add-dialog'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useOpened } from '@/hooks/use-toggle'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { createAdmin } from 'api/services/admins'
import { ROUTES } from 'parameters'
import { emailSchema, requiredString } from 'schemas'

import { Role } from 'api/models/roles/roles'
import AdminForm from '../form'

const formSchema = z.object({
	email: emailSchema.shape.email,
	fullName: requiredString.shape.scheme,
	roleId: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	roles: Array<Role>
}
const AdminAdd = ({ roles }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const confirmDialog = useOpened()
	const cancelDialog = useOpened()
	useNavbarItems({ title: 'Add Admin', backLabel: 'Admins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			fullName: '',
			roleId: roles[0].id
		}
	})

	const handleDialog = () => {
		confirmDialog.toggleOpened()
	}

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await createAdmin(dataWIhoutEmptyString)
		if (result?.message === 'OK') {
			SuccessToast(t('Admins.successfullyCreated'))
			push(ROUTES.ADMINS)
			refresh()
		}
	}

	return (
		<>
			<FormWrapper>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(handleDialog)}>
						<AdminForm cancelDialog={cancelDialog} roles={roles} />
					</form>
				</FormProvider>
			</FormWrapper>
			<ConfirmActionDialog
				title="Admins.addNew"
				description="Admins.addAdminDescription"
				buttonLabel="General.addAndInvite"
				confirmDialog={confirmDialog}
				onSubmit={onSubmit}
			/>
			<CancelAddDialog cancelDialog={cancelDialog} title="Admins.cancelAdd" values={form.getValues()} />
		</>
	)
}

export default AdminAdd
