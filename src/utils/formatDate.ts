import { format, parseISO } from 'date-fns'

export const formatDate = (date: string) => {
	try {
		return format(parseISO(date), 'dd.MM.yyyy, hh:mm')
	} catch (error) {
		return 'Invalid date'
	}
}
