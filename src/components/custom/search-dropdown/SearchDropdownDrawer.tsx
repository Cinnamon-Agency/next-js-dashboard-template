'use client'

import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from 'rooks'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Base } from 'api/models/common/base'

import { SearchInput } from '../inputs/search-input'
import { NoResult } from '../no-result'
import { dropdownListContainer, dropdownListItem, dropdownListItemsContainer } from './SearchDropdown.css'

interface Props {
	options: Base[]
	placeholder: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	name?: string
	alwaysShowSearch?: boolean
	setValue?: Dispatch<SetStateAction<any>>
}

export const SearchDropdownDrawer = ({ name, options, placeholder, alwaysShowSearch, setValue, setIsOpen }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const formContext = useFormContext()
	const { replace } = useRouter()
	const currentSearchParamas = qs.parse(searchParams.toString())
	const searchParamsValuelength = name ? (currentSearchParamas[name] ? currentSearchParamas[name]?.length : 0) : 0
	const noResultMessage =
		options?.length === 0 && !alwaysShowSearch
			? 'General.noResoultMessage'
			: searchParamsValuelength && searchParamsValuelength > 2
				? 'General.noResoultMessage'
				: 'General.searchMinInstructions'

	const handleFilterChange = (filter: string, value: string) => {
		const query = { ...currentSearchParamas, [filter]: value }
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

	const handleDropdownOption = (e: React.MouseEvent<HTMLButtonElement>, option: Base) => {
		e.preventDefault()

		if (name) {
			if (formContext) {
				formContext.setValue(name, option.id)
				formContext.trigger(name)
			} else if (setValue) {
				setValue(option)
			}
		}
		setIsOpen(false)
	}

	return (
		<Box className={dropdownListContainer}>
			<Stack gap={2}>
				{alwaysShowSearch && (
					<Box width="100%" paddingX={1}>
						<SearchInput
							name={name}
							defaultValue={searchParams.get(name ?? '') || ''}
							placeholder={`${t('General.search')} ${t(placeholder)}`}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
				)}
				<Box className={dropdownListItemsContainer}>
					<Stack gap={1}>
						{options && options?.length > 0 ? (
							options?.map(option => (
								<Button key={option.name} size="auto" variant="adaptive" onClick={e => handleDropdownOption(e, option)}>
									<Box className={dropdownListItem}>
										<Text fontSize="small">{option.name}</Text>
									</Box>
								</Button>
							))
						) : (
							<NoResult size="small" noResoultMessage={t(noResultMessage)} />
						)}
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}
