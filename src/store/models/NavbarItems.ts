import { ReactNode } from 'react'

import { OpenedProps } from '@/hooks/use-toggle'

export interface NavbarItems {
	title?: string
	backLabel?: string
	cancelDialog?: OpenedProps
	actionButton?: ReactNode
	location?: string
}
