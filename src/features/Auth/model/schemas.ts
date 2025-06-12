import { z } from "zod"

export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required"}).email(),
    password: z.string({ required_error: "Password is required"}).min(6),
})


export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine(({ password, confirmPassword }) => password === confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })


export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>