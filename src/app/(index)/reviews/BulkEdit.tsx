import { FormItems, FormWrapper } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Select } from '@/components/inputs/select'
import { Textarea } from '@/components/inputs/text-area'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Dialog } from '@/components/overlay/dialog'
import { tokens } from '@/style/theme.css'
import { handleReviewStatusOptions } from '@/utils/handleOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Review, ReviewStatus } from 'api/models/reviews/reviews'
import { updateReview, updateReviewBulk } from 'api/services/reviews'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { requiredString } from 'schemas'
import { z } from 'zod'
import Details from './Details'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'

interface Props {
	opened: boolean
	onClose: () => void
	reviews: Review[]
}

const formSchema = z.object({
	status: requiredString.shape.scheme,
	comment: z.string()
})

type Schema = z.infer<typeof formSchema>

export const BulkEditDialog = ({ opened, onClose, reviews }: Props) => {
	const { refresh } = useRouter()
	const form = useForm<Schema>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { status: reviews[0].status, comment: '' }
	})

	const closeDialog = () => {
		form.reset()
		onClose()
	}

	const onSubmit = async () => {
		const data = form.getValues()
		let result: any
		const payload = {
			status: data.status as ReviewStatus,
			comment: data.comment
		}
		if (reviews.length === 1) {
			result = await updateReview({
				reviewId: reviews[0].id,
				...payload
			})
		} else {
			result = await updateReviewBulk({
				reviewIds: reviews.map(review => review.id),
				...payload
			})
		}

		if (result?.message === 'OK') {
			SuccessToast('Review(s) successfully edited!')
			refresh()
			closeDialog()
		}
	}

	return (
		<Dialog opened={opened} onClose={closeDialog} size="large">
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
								<FormControl name="comment">
									<FormControl.Label>
										<Label>Comment</Label>
									</FormControl.Label>
									<Textarea placeholder="Comment" />
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
