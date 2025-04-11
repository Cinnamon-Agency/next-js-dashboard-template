/* eslint-disable no-undef */
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
import HouseIcon from '@/components/icons/block-icon/assets/house-icon.svg'
import PersonIcon from '@/components/icons/block-icon/assets/person-icon.svg'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { ROUTES } from 'parameters'

export interface Item {
	label: string
	icon: JSX.Element
	route?: string
	isSubItem?: boolean
	usedByRoles?: string[]
	subItems?: Item[]
}

export const drawerItems: Item[] = [
	{
		label: 'reviews',
		icon: <HouseIcon />,
		route: ROUTES.REVIEWS,
		usedByRoles: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN]
	},
	{ label: 'admins', icon: <PersonIcon />, route: ROUTES.MASTER_ADMINS, usedByRoles: [UserRoleEnum.SUPER_ADMIN] },
	{
		label: 'settings',
		icon: <GearIcon />,
		route: ROUTES.SETTINGS,
		usedByRoles: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN]
	}
]
