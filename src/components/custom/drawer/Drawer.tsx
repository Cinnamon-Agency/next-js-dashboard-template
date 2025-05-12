'use client'

import { useState } from 'react'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import { Item, drawerItems } from './Data'
import { drawer } from './Drawer.css'
import { DrawerItem } from './DrawerItem'
import { BrandLogo } from '../brand-logo/BrandLogo'
import { UserPermissionEnum } from 'enums/userRoleEnum'

interface Props {
	permissions: UserPermissionEnum[]
}

export const Drawer = ({ permissions }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const filteredDrawerItems: Item[] = drawerItems.filter(
		(item: Item) => !item.usedByPermission || permissions.includes(item.usedByPermission)
	)

	return (
		<Box className={drawer}>
			<Stack gap={13}>
				<Box paddingLeft={6}>
					<BrandLogo addHomeLink />
				</Box>
				<Stack gap={4}>
					{filteredDrawerItems.map(item => (
						<DrawerItem key={item.label} item={item} isOpen={isOpen} setIsOpen={setIsOpen} />
					))}
				</Stack>
			</Stack>
		</Box>
	)
}
