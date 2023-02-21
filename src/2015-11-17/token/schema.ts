import { z } from 'zod'
import { OpnPaymentsTokenIdSchema } from './id'
import { OpnPaymentsCardFromTokenSchema } from '../card/schema'

export const OpnPaymentsFreshTokenSchema = z.object({
  object: z.literal('token'),
  id: OpnPaymentsTokenIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  card: OpnPaymentsCardFromTokenSchema,
  charge_status: z.string(),
  created: z.string(),
  used: z.literal(false),
})

export const OpnPaymentsUsedTokenSchema = z.object({
  object: z.literal('token'),
  id: OpnPaymentsTokenIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  card: z.null(),
  charge_status: z.string(),
  created: z.string(),
  used: z.literal(true),
})

export const OpnPaymentsTokenSchema = z.union([
  OpnPaymentsFreshTokenSchema,
  OpnPaymentsUsedTokenSchema,
])

export type OpnPaymentsToken = z.infer<typeof OpnPaymentsTokenSchema>
export type OpnPaymentsFreshToken = z.infer<typeof OpnPaymentsFreshTokenSchema>
export type OpnPaymentsUsedToken = z.infer<typeof OpnPaymentsUsedTokenSchema>
