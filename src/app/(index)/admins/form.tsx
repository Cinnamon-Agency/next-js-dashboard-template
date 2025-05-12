'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { Select } from '@/components/inputs/select'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { handleRoleOptions } from '@/utils/handleRoleOptions'
import { Role } from 'api/models/roles/roles'

interface Props {
	roles: Array<Role>
	isEdit?: boolean
	cancelDialog?: OpenedProps
}

const AdminForm = ({ roles, isEdit, cancelDialog }: Props) => {
	const t = useTranslations()

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			{isEdit ? null : (
				<FormControl name="email">
					<FormControl.Label>
						<RequiredLabel>{t('General.email')}</RequiredLabel>
					</FormControl.Label>
					<TextInput type="email" placeholder={t('General.emailPlaceholder')} />
					<FormControl.Message />
				</FormControl>
			)}
			<FormControl name="fullName">
				<FormControl.Label>
					<RequiredLabel>{t('General.fullName')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('General.fullNamePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="roleId">
				<FormControl.Label>
					<RequiredLabel>Role and permissions</RequiredLabel>
				</FormControl.Label>
				<Select options={handleRoleOptions(roles)} placeholder={t('General.rolePlaceholder')} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default AdminForm
