/* eslint-disable no-undef */
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

import { input, inputHasError } from '../input-wrapper/InputWrapper.css'

import { SelectVariants, select } from './Select.css'

interface Option {
	value: string
	label: string
	disabled?: boolean
}

interface CustomInputProps {
	hasError?: boolean
	startIcon?: JSX.Element
	options: Array<Option>
	value?: string
}

type Props = InputHTMLAttributes<HTMLSelectElement> & SelectVariants & CustomInputProps

export const Select = ({ hasError, startIcon, sizes, options, value, ...rest }: Props) => {
	return (
		<select
			{...rest}
			value={value}
			className={clsx(
				select({
					sizes
				}),
				input,
				hasError && inputHasError
			)}>
			{options?.map(option => (
				<option key={option.value} value={option.value} disabled={option.disabled}>
					{option.label}
				</option>
			))}
		</select>
	)
}
