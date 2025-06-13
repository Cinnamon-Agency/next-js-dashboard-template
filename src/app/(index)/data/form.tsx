'use client'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { Label } from '@/components/inputs/label'
import { Textarea } from '@/components/inputs/text-area'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { OpenedProps } from '@/hooks/use-toggle'
import { formatDate } from '@/utils/formatDate'
import { Data } from 'api/models/data/data'

interface Props {
	cancelDialog?: OpenedProps
	data: Data
}

const DataForm = ({ data, cancelDialog }: Props) => {
	const details = [
		{ label: 'Created at', value: formatDate(data.createdAt) },
		{ label: 'Name', value: data.name }
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
			<FormControl name="text">
				<FormControl.Label>
					<Label>Add an input for your data</Label>
				</FormControl.Label>
				<Textarea placeholder="text" />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default DataForm
