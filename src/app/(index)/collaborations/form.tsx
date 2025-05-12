'use client'

import { Text } from '@/components/typography/text'

import { FormItems } from '@/components/custom/layouts/add-form'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { OpenedProps } from '@/hooks/use-toggle'
import { Collaboration } from 'api/models/collaborations/collaborations'

interface Props {
	collaboration: Collaboration
	cancelDialog?: OpenedProps
}

const CollaborationForm = ({ collaboration, cancelDialog }: Props) => {
	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<Stack gap={4}>
				{/* todo replace with the actual fields */}
				<Label>Collaboration ID</Label>
				<Text fontSize="small" color="neutral.800">
					{collaboration.id}
				</Text>
			</Stack>
		</FormItems>
	)
}

export default CollaborationForm
