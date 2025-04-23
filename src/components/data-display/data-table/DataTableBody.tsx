'use client'

import { Cell, ColumnDef, Table, flexRender } from '@tanstack/react-table'
import { usePathname } from 'next/navigation'

import { Badge } from '@/components/custom/badge'
import { NoResult } from '@/components/custom/no-result/NoResult'
import { Checkbox } from '@/components/inputs/checkbox'

import { TableBody, TableCell, TableCellWithLink, TableRow } from '../table'
import { Inline } from '@/components/layout/inline'

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	table: Table<TData>
	contentSection?: string
	data: any
	linkToSinglePage?: boolean
}

export const DataTableBody = <TData, TValue>({
	columns,
	table,
	contentSection,
	data,
	linkToSinglePage
}: Props<TData, TValue>) => {
	const pathname = usePathname()

	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row: any) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
						<TableCell>
							<Checkbox
								checked={row.getIsSelected()}
								indeterminate={row.getIsSomeSelected()}
								onChange={row.getToggleSelectedHandler()}
							/>
						</TableCell>
						{row.getVisibleCells().map((cell: Cell<TData, unknown>) => {
							const cellContent = (
								<Inline alignItems="center" justifyContent="space-between">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
									{cell.column.id.includes('name') &&
										data?.find((item: any) => item.name === cell.getValue())?.isDefault && (
											<Badge variant={'default'} />
										)}
								</Inline>
							)
							return linkToSinglePage ? (
								<TableCellWithLink
									key={cell.id}
									// eslint-disable-next-line sonarjs/no-nested-template-literals
									href={`${pathname}/${contentSection ? `${contentSection}/` : ''}${row.original?.id}`}>
									{cellContent}
								</TableCellWithLink>
							) : (
								<TableCell key={cell.id}>{cellContent}</TableCell>
							)
						})}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell colSpan={columns.length + 1} className="h-24 text-center">
						<NoResult size="large" noResoultMessage="General.noResoultMessage" />
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	)
}
