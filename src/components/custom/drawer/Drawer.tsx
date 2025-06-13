'use client'

import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import { UserPermissionEnum } from 'enums/userRoleEnum'
import { BrandLogo } from '../brand-logo/BrandLogo'
import { Item, drawerItems } from './Data'
import { drawer } from './Drawer.css'
import { DrawerItem } from './DrawerItem'

interface Props {
	permissions: UserPermissionEnum[]
}

export const Drawer = ({ permissions }: Props) => {
	const filteredDrawerItems: Item[] = drawerItems.filter(
		(item: Item) => !item.usedByPermission || permissions.includes(item.usedByPermission)
	)

	return (
		<Box className={drawer}>
			<Stack gap={13}>
				<Box>
					<BrandLogo addHomeLink />
				</Box>
				<Stack gap={5} alignItems="flex-start">
					{filteredDrawerItems.map(item => (
						<DrawerItem key={item.label} item={item} />
					))}
				</Stack>
			</Stack>
		</Box>
	)
}
