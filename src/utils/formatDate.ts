import { format, parseISO } from 'date-fns'

export const formatDate = (date: string) => {
	try {
		return format(parseISO(date), 'MMM d yyyy, h:mma')
	} catch (error) {
		return 'Invalid date'
	}
}
