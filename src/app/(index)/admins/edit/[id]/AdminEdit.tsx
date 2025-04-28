'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Admin } from 'api/models/admin/admin'
import { updateAdmin } from 'api/services/admins'
import { requiredString } from 'schemas'

import { Role } from 'api/models/roles/roles'
import AdminForm from '../../form'

const formSchema = z.object({
	fullName: requiredString.shape.scheme,
	roleId: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	admin: Admin
	roles: Array<Role>
}

const AdminEdit = ({ admin, roles }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Admins.edit', backLabel: 'Admins.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: admin.fullName,
			roleId: admin.role.id
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateAdmin({ ...dataWIhoutEmptyString, id: admin.id })
		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Admins.successfullyEdited')
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<AdminForm isEdit roles={roles} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default AdminEdit
