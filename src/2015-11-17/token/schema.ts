import { z } from 'zod'
import { OpnPaymentsTokenIdSchema } from './id'
import { OpnPaymentsCardSchema } from '../card/schema'

export const OpnPaymentsTokenSchema = z.object({
  object: z.literal('token'),
  id: OpnPaymentsTokenIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  card: OpnPaymentsCardSchema,
  charge_status: z.string(),
  created: z.string(),
  used: z.boolean(),
})

export type OpnPaymentsToken = z.infer<typeof OpnPaymentsTokenSchema>
