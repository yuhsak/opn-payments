import { z } from 'zod'
import { OpnPaymentsListSchema } from '../../list'
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

export const OpnPaymentsRefundListSchema = OpnPaymentsListSchema(OpnPaymentsRefundSchema)

export type OpnPaymentsRefund = z.infer<typeof OpnPaymentsRefundSchema>
export type OpnPaymentsRefundList = z.infer<typeof OpnPaymentsRefundListSchema>
