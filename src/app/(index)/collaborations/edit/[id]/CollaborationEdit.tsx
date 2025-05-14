'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
// import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { requiredString } from 'schemas'

import { Collaboration } from 'api/models/collaborations/collaborations'
import { updateCollaboration } from 'api/services/collaborations'
import CollaborationForm from '../../form'

const formSchema = z.object({
	// todo replace with the actual fields
	id: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	collaboration: Collaboration
}

const CollaborationEdit = ({ collaboration }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Edit Collaboration', backLabel: 'Collaborations.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { id: collaboration.id }
	})

	const onSubmit = async () => {
		// const data = form.getValues()
		// const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateCollaboration({
			collaborationId: collaboration.id
		})

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Collaborations.successfullyEdited')
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CollaborationForm collaboration={collaboration} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default CollaborationEdit
