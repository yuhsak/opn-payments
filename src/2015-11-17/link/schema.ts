import { z } from 'zod'
import { OpnPaymentsLinkIdSchema } from './id'
import { OpnPaymentsChargeSchema } from '../charge/schema'
import { OpnPaymentsListSchema } from '../../list'

export const OpnPaymentsLinkSchema = z.object({
  object: z.literal('link'),
  id: OpnPaymentsLinkIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  amount: z.number().int(),
  charges: OpnPaymentsListSchema(OpnPaymentsChargeSchema),
  created: z.string(),
  currency: z.string(),
  deleted: z.boolean(),
  description: z.string(),
  multiple: z.boolean(),
  payment_uri: z.string(),
  title: z.string(),
  used: z.boolean(),
})

export type OpnPaymentsLink = z.infer<typeof OpnPaymentsLinkSchema>
