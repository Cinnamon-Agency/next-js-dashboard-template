'use client'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Collaboration } from 'api/models/collaborations/collaborations'
import { ROUTES } from 'parameters'

interface Props {
	collaboration: Collaboration
}

export const CollaborationDetails = ({ collaboration }: Props) => {
	useNavbarItems({
		title: `Collaboration ${collaboration.id}`,
		backLabel: 'Collaborations.back',
		actionButton: (
			<EditButton buttonLabel="Collaborations.edit" buttonLink={ROUTES.EDIT_COLLABORATIONS + collaboration.id} />
		)
	})

	const details = [
		{ label: 'Status', value: collaboration.status },
		{ label: 'Reason to collaborate', value: collaboration.reasonToCollaborate },
		{ label: 'Created at', value: collaboration.createdAt },
		{ label: 'In deadline', value: collaboration.inDeadline },
		{ label: 'Type', value: collaboration.type },
		{ label: 'Owner', value: collaboration.owner.email },
		{ label: 'Collaborator', value: collaboration.collaborator.email },
		{ label: 'Cancellation status', value: collaboration.cancellation?.status },
		{ label: 'Cancellation reason', value: collaboration.cancellation?.reason },
		{ label: 'Cancellation admin comment', value: collaboration.cancellation?.adminComment },
		{ label: 'Cancellation collaborator comment', value: collaboration.cancellation?.collaboratorComment }
	]

	return (
		<DetailsWrapper>
			{details.map(({ label, value }) => (
				<Stack gap={4} key={label}>
					<Label>{label}</Label>
					<Text fontSize="small" color="neutral.800">
						{value}
					</Text>
				</Stack>
			))}
		</DetailsWrapper>
	)
}
