import { z } from 'zod';

export const PaymentMethodSchema = z.object({
    createdAt: z.number(),
    updatedAt: z.number(),
    id: z.number(),
    clickUpId: z.string(),
    title: z.string(),
    ricAmount: z.number(),
    ricNumOfInstallments: z.number(),
    cppAmount: z.number(),
    cppNumOfInstallments: z.number(),
});
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>

export const ContractSchema = z.object({
    createdAt: z.number(),
    updatedAt: z.number(),
    id: z.number(),
    paymentMethodOptions: z.array(z.number()),
    aggrementDate: z.number().nullable(),
    tipStartDate: z.number().nullable(),
    trainingStartDate: z.number(),
    trainingEndDate: z.number(),
    additionalNotes: z.string().nullable(),
    contractPdf: z.string().nullable(),
    isClosed: z.boolean(),
});

export const ProgramSchema = z.object({
    createdAt: z.number(),
    updatedAt: z.number(),
    id: z.number(),
    clickUpId: z.string(),
    title: z.string(),
    commitment: z.string(),
    courseFormat: z.string(),
    trainingDurationInMonths: z.number(),
    jobHuntSupportDurationInMonths: z.number(),
    mentorStyle: z.string(),
    model: z.string(),
    paymentType: z.string().nullable(),
    support: z.string(),
    trialPeriodInDays: z.number(),
});

export const ContractsDataSchema = z.object({
    contract: ContractSchema,
    program: ProgramSchema,
    paymentMethods: z.array(PaymentMethodSchema),
});
export type ContractDataType = z.infer<typeof ContractsDataSchema>