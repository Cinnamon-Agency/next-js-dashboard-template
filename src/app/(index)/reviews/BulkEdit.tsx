import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { replaceEmptyStringFromObjectWithNull } from '@/utils/replaceEmptyStringFromObjectWithNull'
import { Dialog } from '@/components/overlay/dialog'
import { tokens } from '@/style/theme.css'
import { handleReviewStatusOptions } from '@/utils/handleOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Review } from 'api/models/reviews/reviews'
import { FormProvider, useForm } from 'react-hook-form'
import { requiredString } from 'schemas'
import { z } from 'zod'
import Details from './Details'
import { RequiredLabel } from '@/components/inputs/required-label'
import { updateReview } from 'api/services/reviews'
import { useRouter } from 'next/navigation'

interface Props {
	opened: boolean
	onClose: () => void
	reviews: Review[]
}

const formSchema = z.object({
	status: requiredString.shape.scheme
})

type Schema = z.infer<typeof formSchema>

export const BulkEditDialog = ({ opened, onClose, reviews }: Props) => {
	const { refresh } = useRouter()
	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { status: reviews[0].status }
	})

	const onSubmit = async () => {
		const data = form.getValues()
		const dataWIhoutEmptyString = replaceEmptyStringFromObjectWithNull(data)
		let result: any
		if (reviews.length === 1) {
			result = await updateReview({
				reviewId: reviews[0].id,
				status: dataWIhoutEmptyString.status
			})
		} else {
			// todo add bulk update api
		}

		if (result?.message === 'OK') {
			localStorage.setItem('editMessage', 'Reviews.successfullyEdited')
			refresh()
			onClose()
		}
	}

	return (
		<Dialog opened={opened} onClose={onClose} size="large">
			<DialogTitle
				style={{
					paddingLeft: tokens.spacing[9],
					paddingBottom: tokens.spacing[2],
					color: tokens.colors['neutral.700']
				}}>
				Bulk Edit
			</DialogTitle>
			<Stack style={{ overflowY: 'auto', maxHeight: '600px' }}>
				{reviews.map(review => (
					<Box key={review.id}>
						<Details review={review} />
					</Box>
				))}
				<FormWrapper>
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormItems openCancelDialog={onClose}>
								<FormControl name="status">
									<FormControl.Label>
										<RequiredLabel>Review status</RequiredLabel>
									</FormControl.Label>
									<Select options={handleReviewStatusOptions({ omitDefaultLabel: true })} />
									<FormControl.Message />
								</FormControl>
							</FormItems>
						</form>
					</FormProvider>
				</FormWrapper>
			</Stack>
		</Dialog>
	)
}
