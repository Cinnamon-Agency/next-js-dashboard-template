'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { Box } from '@/components/layout/box'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Data } from 'api/models/data/data'
import { requiredString } from 'schemas'
import DataForm from '../../form'

const formSchema = z.object({
	name: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	data: Data
}

const DataEdit = ({ data }: Props) => {
	// const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Edit Cancellation Status', backLabel: 'Data.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data.name
		}
	})

	const onSubmit = async () => {
		// const data = form.getValues()
		// add your update api call
		// if (result?.message === 'OK') {
		// 	localStorage.setItem('editMessage', 'Data.successfullyEdited')
		// 	refresh()
		// 	back()
		// }
	}

	if (!data) {
		return (
			<Box padding={11}>
				<Text variant="bodytext" color="neutral.800">
					No data to show
				</Text>
			</Box>
		)
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<DataForm data={data} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default DataEdit
