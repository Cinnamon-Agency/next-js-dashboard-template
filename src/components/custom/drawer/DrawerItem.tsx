'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'

import { Text } from '../../typography/text'
import { Item } from './Data'
import { drawerItem, drawerItemSelected } from './Drawer.css'

interface Props {
	item: Item
}

export const DrawerItem = ({ item }: Props) => {
	const pathname = usePathname()
	const t = useTranslations()

	const handleRoute = (item: Item) => {
		return item.route ? pathname.includes(item.route) : false
	}

	return (
		<Button variant="adaptive" size="auto" href={item.route}>
			<Box
				className={clsx(drawerItem, handleRoute(item) && drawerItemSelected)}
				style={{ cursor: item.route && pathname.includes(item.route) ? 'default' : 'inherit' }}>
				<Inline gap={4} alignItems="center">
					{item.icon}
					<Text fontSize="big" fontWeight="semibold" lineHeight="xlarge" textAlign="left">
						{t(`General.${item.label}`)}
					</Text>
				</Inline>
			</Box>
		</Button>
	)
}
