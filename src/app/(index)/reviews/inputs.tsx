'use client'

import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useOpened } from '@/hooks/use-toggle'
import { useTableStore } from '@/store/table'
import { Review } from 'api/models/reviews/reviews'
import { ROUTES } from 'parameters/routes'

interface Props {
	data: Review[]
}

export const Inputs = ({ data }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const confirmDialog = useOpened()
	const { checkedItems, checkedItemsLength, clearCheckedItems } = useTableStore()
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

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					<Box style={{ width: '320px' }}>
						{/* todo add filter by status */}
						{/* <SearchInput
							name="search"
							defaultValue={searchParams.get('search') || ''}
							placeholder={t('Barnahuses.searchBarnahus')}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/> */}
					</Box>
				</Inline>
			) : (
				<DataTableActions onEdit={handleEdit} />
			)}
		</div>
	)
}
