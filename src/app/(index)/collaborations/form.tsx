'use client'

import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { Label } from '@/components/inputs/label'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Textarea } from '@/components/inputs/text-area'
import { OpenedProps } from '@/hooks/use-toggle'
import { CollaborationCancellationStatus } from 'api/models/collaborations/collaborations'

interface Props {
	cancelDialog?: OpenedProps
}

const CollaborationForm = ({ cancelDialog }: Props) => {
	const transformedStatusArray = Object.keys(CollaborationCancellationStatus).map(key => ({
		id: key,
		name: key
	}))
	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="cancellationStatus">
				<FormControl.Label>
					<RequiredLabel>Cancellation status</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown placeholder="Collaborations.cancellationStatus" options={transformedStatusArray} />
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
