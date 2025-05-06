'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormWrapper } from '@/components/custom/layouts/add-form'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { updateReview } from 'api/services/reviews'
import { requiredString } from 'schemas'

import { Review } from 'api/models/reviews/reviews'
import ReviewForm from '../../form'

const formSchema = z.object({
	status: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

interface Props {
	review: Review
}

const ReviewEdit = ({ review }: Props) => {
	const { back, refresh } = useRouter()
	useNavbarItems({ title: 'Edit Review', backLabel: 'Reviews.back' })

	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { status: review.status }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		const result = await updateReview({
			reviewId: review.id,
			status: dataWIhoutEmptyString.status
		})

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Reviews.successfullyEdited')
			refresh()
			back()
		}
	}

	return (
		<FormWrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ReviewForm review={review} />
				</form>
			</FormProvider>
		</FormWrapper>
	)
}

export default ReviewEdit
