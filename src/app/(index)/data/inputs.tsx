'use client'

import { SearchInput } from '@/components/custom/inputs/search-input'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useTableStore } from '@/store/table'
import { ROUTES } from 'parameters/routes'

import { DatePicker } from '@/components/inputs/date-picker'
import { Data } from 'api/models/data/data'

interface Props {
	data: Data[]
	writePermission?: boolean
}

export const Inputs = ({ data, writePermission }: Props) => {
	const searchParams = useSearchParams()
	const { checkedItems, checkedItemsLength } = useTableStore()
	const { push, replace, refresh } = useRouter()

	const handleFilterChange = (filter: string, value: string) => {
		const current = qs.parse(searchParams.toString())
		const query = { ...current, [filter]: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		replace(url)
	}

	const debouncedFilterChange = useDebounce(handleFilterChange, 300)

	const handleEdit = () => {
		const index = Object.keys(checkedItems || {})
		const numericIndex = parseInt(index[0], 10)

		push(ROUTES.EDIT_DATA + data[numericIndex].id)
		refresh()
	}

	if (checkedItemsLength) {
		return <DataTableActions onEdit={handleEdit} disableEdit={!writePermission} disableDelete={!writePermission} />
	}

	return (
		<Inline gap={4}>
			<Box style={{ width: '320px' }}>
				<SearchInput
					name="search"
					aria-label="Search"
					defaultValue={searchParams.get('search') || ''}
					placeholder="Search"
					onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
				/>
			</Box>
			<DatePicker
				aria-label="Search by date"
				onChange={e => handleFilterChange('date', e.target.value)}
				value={searchParams.get('date') || ''}
			/>
		</Inline>
	)
}
