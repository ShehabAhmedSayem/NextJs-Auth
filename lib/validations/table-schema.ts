import { z } from "zod"


export const studentTableSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    programName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.string(),
})

export type studentTableSchema = z.infer<typeof studentTableSchema>