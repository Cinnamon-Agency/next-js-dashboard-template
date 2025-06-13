/* eslint-disable no-undef */
import BriefcaseIcon from '@/components/icons/block-icon/assets/briefcase-icon.svg'
import GearIcon from '@/components/icons/block-icon/assets/gear-icon.svg'
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
		label: 'data',
		icon: <BriefcaseIcon />,
		route: ROUTES.DATA,
		usedByPermission: UserPermissionEnum.DATA_READ
	},
	{
		label: 'settings',
		icon: <GearIcon />,
		route: ROUTES.SETTINGS
	}
]
