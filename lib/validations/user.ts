import { z } from "zod";


const ProfileSchema = z.object({
    createdAt: z.optional(z.string()),
    updatedAt: z.optional(z.string()),
    id: z.number(),
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
    phoneNumber: z.string(),
    ssn: z.string().nullable(),
    dateOfBirth: z.string().nullable(),
    graduationDate: z.number(),
    address: z.string(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipcode: z.string().nullable(),
    status: z.string(),
    isIdVerified: z.boolean(),
    isOnboardingCompleted: z.boolean(),
});


export const UserSchema = z.object({
    createdAt: z.optional(z.string()),
    updatedAt: z.optional(z.string()),
    id: z.string(),
    email: z.string(),
    role: z.string(),
    isInviteMailSent: z.boolean(),
    profile: z.optional(ProfileSchema.nullable()),
});
export type User = z.infer<typeof UserSchema>;


export const InviteApplicantSchema = z.object({
    email: z.string().email(),
    applicantId: z.string()

})
export type InviteApplicant = z.infer<typeof InviteApplicantSchema>