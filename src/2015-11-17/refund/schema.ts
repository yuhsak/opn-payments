import { z } from 'zod'
import { OpnPaymentsChargeIdSchema } from '../charge/id'
import { OpnPaymentsTransactionIdSchema } from '../transaction/id'
import { OpnPaymentsRefundIdSchema } from './id'

export const OpnPaymentsRefundSchema = z.object({
  object: z.literal('refund'),
  id: OpnPaymentsRefundIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  funding_amount: z.number().int(),
  funding_currency: z.string(),
  voided: z.boolean(),
  currency: z.string(),
  amount: z.number(),
  metadata: z.unknown(),
  charge: OpnPaymentsChargeIdSchema,
  transaction: OpnPaymentsTransactionIdSchema,
  created: z.string(),
})

export type OpnPaymentsRefund = z.infer<typeof OpnPaymentsRefundSchema>
