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

import { Collaboration, CollaborationStatus } from 'api/models/collaborations/collaborations'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { DatePicker } from '@/components/inputs/date-picker'

interface Props {
	data: Collaboration[]
	writePermission?: boolean
}

export const Inputs = ({ data, writePermission }: Props) => {
	const searchParams = useSearchParams()
	const { checkedItems, checkedItemsLength } = useTableStore()
	const { push, replace, refresh } = useRouter()
	const transformedStatusArray = Object.keys(CollaborationStatus).map(key => ({
		id: key,
		name: key
	}))

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

		push(ROUTES.EDIT_COLLABORATIONS + data[numericIndex].id)
		refresh()
	}

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline gap={4}>
					<Box style={{ width: '320px' }}>
						<SearchInput
							name="search"
							defaultValue={searchParams.get('search') || ''}
							placeholder="Search by owner/collaborator"
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					<Box style={{ position: 'relative' }}>
						<SearchDropdown
							placeholder="Collaborations.status"
							name="status"
							options={[{ id: '', name: 'All' }, ...transformedStatusArray]}
							value={searchParams.get('status') || 'Select collaboration status'}
							isFilter
							setValue={({ id }) => debouncedFilterChange('status', id)}
						/>
					</Box>
					<DatePicker
						onChange={e => debouncedFilterChange('date', e.target.value)}
						value={searchParams.get('date') || ''}
					/>
				</Inline>
			) : writePermission ? (
				<DataTableActions onEdit={handleEdit} />
			) : null}
		</div>
	)
}
