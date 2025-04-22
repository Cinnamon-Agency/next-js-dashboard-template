/* eslint-disable no-undef */
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import HouseIcon from '@/components/icons/block-icon/assets/house-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import { UserPermissionEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters'

export interface Item {
	label: string
	icon: JSX.Element
	route: string
	usedByPermission?: UserPermissionEnum
}

export const drawerItems: Item[] = [
	{
		label: 'reviews',
		icon: <HouseIcon />,
		route: ROUTES.REVIEWS,
		usedByPermission: UserPermissionEnum.REVIEW_READ
	},
	{ label: 'admins', icon: <PersonIcon />, route: ROUTES.ADMINS, usedByPermission: UserPermissionEnum.ADMIN_READ },
	{
		label: 'settings',
		icon: <GearIcon />,
		route: ROUTES.SETTINGS
	}
]
