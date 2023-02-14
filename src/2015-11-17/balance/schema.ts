import { z } from 'zod'

export const OpnPaymentsBalanceSchema = z.object({
  object: z.literal('balance'),
  livemode: z.boolean(),
  location: z.string(),
  available: z.number().int(),
  currency: z.string(),
  reserve_amount: z.number().int(),
  total: z.number().int(),
})

export type OpnPaymentsBalance = z.infer<typeof OpnPaymentsBalanceSchema>
