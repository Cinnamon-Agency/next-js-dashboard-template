import { format, parseISO } from 'date-fns'

export const formatDate = (date: string, formatType: string) => {
	try {
		return format(parseISO(date), formatType)
	} catch (error) {
		return 'Invalid date'
	}
}
