import { z } from 'zod'

export const emailSchema = z.object({
	email: z.string().min(1, { message: 'ValidationMessages.required' }).email('ValidationMessages.email')
})

export const passwordSchema = z.object({
	password: z
		.string()
		.min(1, { message: 'ValidationMessages.required' })
		.regex(/^(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z0-9\S]{8,24}$/, {
			message: 'ValidationMessages.password'
		})
})
export const loginPasswordSchema = z.object({
	password: z.string().min(1, { message: 'ValidationMessages.required' })
})

export const requiredString = z.object({
	scheme: z.string().min(1, { message: 'ValidationMessages.required' })
})

export const phoneNumberScheme = z.object({
	phone: z
		.string()
		.regex(/^(|([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){3,24})$/, 'ValidationMessages.phone')
})

export const optionalPhoneNumberScheme = z.object({
	phone: z
		.string()
		.regex(/^(|([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){3,24})?$/, 'ValidationMessages.phone')
})
