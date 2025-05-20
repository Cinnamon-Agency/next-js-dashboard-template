'use client'

import { FormItems } from '@/components/custom/layouts/add-form'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { OpenedProps } from '@/hooks/use-toggle'
import { Collaboration, CollaborationCancellationStatus } from 'api/models/collaborations/collaborations'

interface Props {
	collaboration: Collaboration
	cancelDialog?: OpenedProps
}

const CollaborationForm = ({ collaboration, cancelDialog }: Props) => {
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
			{/* todo add comment */}
		</FormItems>
	)
}

export default CollaborationForm
