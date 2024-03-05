import * as z from "zod"

export const authSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters long",
        })
        .max(100)
    ,
})

export const checkEmailSchema = z.object({
    email: authSchema.shape.email,
})


export const resetPasswordSchema = z
    .object({
        password: authSchema.shape.password,
        confirmPassword: authSchema.shape.password,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })


export const schema = z.object({
    first_name: z.string().min(1, {
        message: "Please enter your First name.",
    }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, {
        message: "Please enter your  Last name.",
    }),

    ssn: z.string().length(9, {
        message: 'Social Security Number must be 9 digits',
    }),
    confirm_ssn: z.string(),

    day: z.number().min(1, {
        message: 'Day must be at least 1',
    }).max(31, {
        message: 'Day cannot exceed 31',
    }),
    month: z.number().min(1, {
        message: 'Month must be at least 1',
    }).max(12, {
        message: 'Month cannot exceed 12',
    }),
    year: z.number(),

    address: z.string().min(1, {
        message: 'Address is required',
    }),

    city: z.string().min(1, {
        message: 'City is required',
    }),
    state: z.string(),
    zip_code: z.string()
});