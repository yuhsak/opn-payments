import { z } from 'zod'

export const OpnPaymentsCapabilitySchema = z.object({
  object: z.literal('capability'),
  location: z.string(),
  banks: z.string().array(),
  limits: z.record(
    z.object({
      min: z.number().int(),
      max: z.number().int(),
    }),
  ),
  payment_backends: z.unknown().array(),
  zero_interest_installments: z.boolean(),
})

export type OpnPaymentsCapability = z.infer<typeof OpnPaymentsCapabilitySchema>
