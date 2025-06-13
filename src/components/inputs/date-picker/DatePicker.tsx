import { input } from './DatePicker.css'

export const DatePicker = ({ ...props }: React.ComponentPropsWithoutRef<'input'>) => {
	return <input {...props} aria-label="Date" type="date" className={input} />
}
