import { z } from 'zod'

export const OpnPaymentsForexSchema = z.object({
  object: z.literal('forex'),
  location: z.string(),
  from: z.string(),
  to: z.string(),
  rate: z.number(),
})

export type OpnPaymentsForex = z.infer<typeof OpnPaymentsForexSchema>
