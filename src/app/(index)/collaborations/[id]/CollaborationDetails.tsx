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
		backLabel: 'Collaboration.back',
		actionButton: (
			<EditButton buttonLabel="Collaborations.edit" buttonLink={ROUTES.EDIT_COLLABORATIONS + collaboration.id} />
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				{/* todo replace with the actual fields */}
				<Label>Collaboration ID</Label>
				<Text fontSize="small" color="neutral.800">
					{collaboration.id}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
