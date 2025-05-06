'use client'

import { SearchInput } from '@/components/custom/inputs/search-input'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useTableStore } from '@/store/table'
import { Review, ReviewStatus } from 'api/models/reviews/reviews'
import { ROUTES } from 'parameters/routes'

import { SearchDropdown } from '@/components/custom/search-dropdown'

interface Props {
	data: Review[]
}

export const Inputs = ({ data }: Props) => {
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

		push(ROUTES.EDIT_REVIEW + data[numericIndex].id)
		refresh()
	}
	const transformedStatusArray = Object.keys(ReviewStatus).map(key => ({
		id: key,
		name: key
	}))
	const transformedRatingArray = Array.from({ length: 5 }, (_, i) => ({
		id: (i + 1).toString(),
		name: 'Avg rating ' + (i + 1).toString()
	}))

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline gap={4}>
					<Box style={{ width: '320px' }}>
						<SearchInput
							name="search"
							defaultValue={searchParams.get('search') || ''}
							placeholder="Search by reviewer or comment"
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					<Box style={{ position: 'relative' }}>
						<SearchDropdown
							placeholder="Reviews.status"
							name="status"
							options={[{ id: '', name: 'All' }, ...transformedStatusArray]}
							value={searchParams.get('status') || 'Select status'}
							isFilter
							setValue={({ id }) => debouncedFilterChange('status', id)}
						/>
					</Box>
					<Box style={{ position: 'relative' }}>
						<SearchDropdown
							placeholder="Reviews.rating"
							name="rating"
							options={[{ id: '', name: 'All' }, ...transformedRatingArray]}
							value={searchParams.get('rating') || 'Select avg rating'}
							isFilter
							setValue={({ id }) => debouncedFilterChange('rating', id)}
						/>
					</Box>
				</Inline>
			) : (
				<DataTableActions onEdit={handleEdit} />
			)}
		</div>
	)
}
