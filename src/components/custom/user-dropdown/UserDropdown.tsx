'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import { UserIcon } from '@/components/icons/user-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { logout } from 'api/services/auth'
import { ROUTES } from 'parameters'

import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'
import { dropdownListContainer, dropdownListItem, dropdownListItemWithAction } from './UserDropdown.css'

interface Option {
	label?: string
	action?: any
	disabled?: boolean
}

export const UserDropdown = () => {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const { replace } = useRouter()
	const { data: session } = useSession()

	const handleLogout = async () => {
		const result = await logout()

		if (result?.message === 'OK') {
			signOut({ callbackUrl: ROUTES.LOGIN })
		}
	}

	const options: Option[] = [
		{
			label: session?.user.email
		},
		{
			label: 'Profile settings',
			action: () => replace(ROUTES.SETTINGS)
		},
		{
			label: 'Log out',
			action: () => handleLogout()
		}
	]

	const handleDropDownOpening = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsOpen(!isOpen)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div ref={ref}>
			<Box position="relative">
				<Box display="flex" width="100%" justifyContent="flex-end">
					<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
						<Box borderRadius="small" padding={2} backgroundColor="neutral.100">
							<Inline gap={2} alignItems="center">
								<UserIcon size="medium" color="neutral.800" />
								<Text fontSize="medium" fontWeight="semibold" lineHeight="xlarge" color="neutral.800">
									{session?.user.name}
								</Text>
								<BlockIcon icon={isOpen ? CarretUpIcon : CarretDownIcon} size="medium" color="neutral.800" />
							</Inline>
						</Box>
					</Button>
				</Box>
				{isOpen && (
					<Box className={dropdownListContainer}>
						<Stack>
							{options?.map(option =>
								option.action ? (
									<Button
										key={option.label}
										size="auto"
										variant="adaptive"
										disabled={option.disabled}
										onClick={option.action}>
										<Box className={dropdownListItemWithAction}>
											<Text fontSize="medium" lineHeight="xlarge">
												{option.label}
											</Text>
										</Box>
									</Button>
								) : (
									<Box key={option.label} className={dropdownListItem}>
										<Text fontSize="medium" lineHeight="xlarge">
											{option.label}
										</Text>
									</Box>
								)
							)}
						</Stack>
					</Box>
				)}
			</Box>
		</div>
	)
}
