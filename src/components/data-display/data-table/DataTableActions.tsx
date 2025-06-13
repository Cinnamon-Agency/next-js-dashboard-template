'use client'

import { useTranslations } from 'next-intl'

import { PencilIcon } from '@/components/icons/pencil-icon'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'
import { ButtonVariants } from '@/components/inputs/button/Button.css'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { useTableStore } from '@/store/table'

interface DataTableActionsProps {
	editMultiple?: boolean
	disableDelete?: boolean
	disableEdit?: boolean
	onEdit?: () => void
	onDelete?: () => void
}

type Props = DataTableActionsProps & ButtonVariants

export const DataTableActions = ({
	size = 'large',
	disableDelete,
	disableEdit,
	onEdit,
	onDelete,
	editMultiple
}: Props) => {
	const t = useTranslations()
	const { checkedItemsLength, clearCheckedItems } = useTableStore()
	const isEditMultiple = checkedItemsLength > 1 ? editMultiple : true

	return (
		<Inline gap={4} alignItems="center">
			{onEdit && !disableEdit && isEditMultiple && (
				<Button size={size} variant="secondary" onClick={() => onEdit()}>
					<PencilIcon size="medium" color="neutral.700" />
					{t('General.edit')}
				</Button>
			)}
			{onDelete && !disableDelete && checkedItemsLength === 1 && (
				<Button size={size} variant="secondary" onClick={() => onDelete()}>
					<TrashIcon size="medium" color="destructive.500" />
					<Text color="destructive.500" fontWeight="semibold">
						{t('General.delete')}
					</Text>
				</Button>
			)}
			<Inline gap={2}>
				<Text color="neutral.400" fontSize="small">
					{t('General.itemsSelectedMessage', { count: checkedItemsLength })}
				</Text>
				<Button variant="adaptive" size="auto" onClick={() => clearCheckedItems()}>
					<Text color="primary.500" fontSize="small">
						{t('General.clearSection')}
					</Text>
				</Button>
				{disableEdit && disableDelete && (
					<Text color="destructive.500" fontSize="small">
						You don't have write permissions to edit or delete.
					</Text>
				)}
			</Inline>
		</Inline>
	)
}
