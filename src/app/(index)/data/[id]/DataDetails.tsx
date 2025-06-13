'use client'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { formatDate } from '@/utils/formatDate'
import { Data } from 'api/models/data/data'
import { ROUTES } from 'parameters'

interface Props {
	data: Data
}

export const DataDetails = ({ data }: Props) => {
	useNavbarItems({
		title: `Data ${data.id}`,
		backLabel: 'Data.back',
		actionButton: <EditButton buttonLabel="Data.edit" buttonLink={ROUTES.EDIT_DATA + data.id} />
	})

	const details = [
		{ label: 'Created at', value: formatDate(data.createdAt) },
		{ label: 'Name', value: data.name }
	]

	return (
		<DetailsWrapper>
			{details.map(({ label, value }) => (
				<Stack gap={4} key={label}>
					<Label>{label}</Label>
					<Text fontSize="small" color="neutral.800">
						{value ?? 'No data'}
					</Text>
				</Stack>
			))}
		</DetailsWrapper>
	)
}
