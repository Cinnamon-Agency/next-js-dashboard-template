'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'

import { Dispatch, SetStateAction } from 'react'
import { Text } from '../../typography/text'
import { Item } from './Data'
import { drawerItemSelected } from './Drawer.css'

interface Props {
	item: Item
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const DrawerItem = ({ item, isOpen, setIsOpen }: Props) => {
	const pathname = usePathname()
	const t = useTranslations()

	const handleRoute = (item: Item) => {
		return item.route ? pathname.includes(item.route) : false
	}

	return item?.route ? (
		<Button variant="adaptive" size="auto" href={item.route}>
			<Box
				className={clsx(handleRoute(item) && drawerItemSelected)}
				style={{ cursor: item.route && pathname.includes(item.route) ? 'default' : 'inherit' }}>
				<Inline gap={4} alignItems="center">
					{item.icon}
					<Box
						style={{
							maxWidth: '200px',
							textOverflow: 'ellipsis',
							whiteSpace: 'Wrap',
							flexGrow: '1',
							textAlign: 'center'
						}}>
						<Text fontSize="big" fontWeight="semibold" lineHeight="xlarge" textAlign="left">
							{t(`General.${item.label}`)}
						</Text>
					</Box>
				</Inline>
			</Box>
		</Button>
	) : (
		<Button variant="adaptive" size="auto" onClick={() => setIsOpen(!isOpen)}>
			<Box
				className={clsx(handleRoute(item) && drawerItemSelected)}
				style={{ cursor: item.route && pathname.includes(item.route) ? 'default' : 'inherit' }}>
				<Inline gap={4} alignItems="center">
					{item.icon}
					<Box
						style={{
							maxWidth: '200px',
							textOverflow: 'ellipsis',
							whiteSpace: 'Wrap',
							flexGrow: '1',
							textAlign: 'center'
						}}>
						<Text fontSize="big" fontWeight="semibold" lineHeight="xlarge" textAlign="left">
							{t(`General.${item.label}`)}
						</Text>
					</Box>
				</Inline>
			</Box>
		</Button>
	)
}
