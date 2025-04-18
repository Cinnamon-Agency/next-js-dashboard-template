'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { Select } from '@/components/inputs/select'
import { Role } from 'api/models/roles/roles'
import { UserRoleEnum } from 'enums/userRoleEnum'

interface Props {
	roles: Array<Role>
	isEdit?: boolean
	cancelDialog?: OpenedProps
}

const AdminForm = ({ roles, isEdit, cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="email">
				<FormControl.Label>
					<RequiredLabel>{t('General.email')}</RequiredLabel>
				</FormControl.Label>
				<TextInput disabled={isEdit} type="email" placeholder={t('General.emailPlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="fullName">
				<FormControl.Label>
					<RequiredLabel>{t('General.fullName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.fullNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="roleId">
				<FormControl.Label>
					<RequiredLabel>{t('General.role')}</RequiredLabel>
				</FormControl.Label>
				<Select
					options={roles
						.filter(({ name }) => name !== UserRoleEnum.SUPER_ADMIN)
						.map(({ id, permissions }) => ({ value: id, label: permissions.toString() }))}
					placeholder={t('General.rolePlaceholder')}
				/>
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default AdminForm
