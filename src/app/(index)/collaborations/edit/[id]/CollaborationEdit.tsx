'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { collaborationFormSchema } from 'schemas'

import { Collaboration } from 'api/models/collaborations/collaborations'
import { updateCollaborationCancellationStatus } from 'api/services/collaborations'
import CollaborationForm from '../../form'

type Schema = z.infer<typeof collaborationFormSchema>

interface Props {
	collaboration: Collaboration
}

const CollaborationEdit = ({ collaboration }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Edit Collaboration', backLabel: 'Collaborations.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(collaborationFormSchema),
		defaultValues: {
			status: collaboration.cancellation.status,
			comment: ''
		}
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateCollaborationCancellationStatus({
			collaborationId: collaboration.id,
			collaborationCancellationId: collaboration.cancellation.requestedById, //todo
			...dataWIhoutEmptyString
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
