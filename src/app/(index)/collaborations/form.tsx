'use client'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Select } from '@/components/inputs/select'
import { Textarea } from '@/components/inputs/text-area'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { OpenedProps } from '@/hooks/use-toggle'
import { handleCancellationStatusOptions } from '@/utils/handleOptions'
import { Collaboration } from 'api/models/collaborations/collaborations'
import { formatDate } from '@/utils/formatDate'
interface Props {
	cancelDialog?: OpenedProps
	collaboration: Collaboration
}

const CollaborationForm = ({ collaboration, cancelDialog }: Props) => {
	const details = [
		{ label: 'Collaboration status', value: collaboration.status },
		{ label: 'Reason to collaborate', value: collaboration.reasonToCollaborate },
		{ label: 'Created at', value: formatDate(collaboration.createdAt) },
		{ label: 'In deadline', value: collaboration.inDeadline ? 'Yes' : 'No' },
		{ label: 'Type', value: collaboration.type },
		{ label: 'Owner', value: collaboration.owner.email },
		{ label: 'Collaborator', value: collaboration.collaborator.email },
		{ label: 'Cancellation reason', value: collaboration.cancellation?.reason },
		{ label: 'Cancellation admin comment', value: collaboration.cancellation?.adminComment },
		{ label: 'Cancellation collaborator comment', value: collaboration.cancellation?.collaboratorComment }
	]
	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			{details.map(({ label, value }) => (
				<Stack gap={4} key={label}>
					<Label>{label}</Label>
					<Text fontSize="small" color="neutral.800">
						{value ?? 'No data'}
					</Text>
				</Stack>
			))}
			<FormControl name="cancellationStatus">
				<FormControl.Label>
					<RequiredLabel>Cancellation status</RequiredLabel>
				</FormControl.Label>
				<Select options={handleCancellationStatusOptions({ omitDefaultLabel: true })} />
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
	)
}

export default CollaborationForm
