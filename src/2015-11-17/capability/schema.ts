import { z } from 'zod'

export const OpnPaymentsCapabilitySchema = z.object({
  object: z.literal('capability'),
  location: z.string(),
  banks: z.string().array(),
  limits: z.record(
    z.object({
      min: z.number().int().optional(),
      max: z.number().int().optional(),
    }),
  ),
  payment_backends: z.unknown().array(),
  zero_interest_installments: z.boolean(),
  tokenization_methods: z.string().array(),
})

export type OpnPaymentsCapability = z.infer<typeof OpnPaymentsCapabilitySchema>
