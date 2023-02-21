import { z } from 'zod'
import { OpnPaymentsTransactionIdSchema } from './id'
import { OpnPaymentsChargeIdSchema } from '../charge/id'
import { OpnPaymentsRefundIdSchema } from '../refund/id'
import { OpnPaymentsDisputeIdSchema } from '../dispute/id'
import { OpnPaymentsTransferIdSchema } from '../transfer/id'
import { OpnPaymentsListSchema } from '../../list'

export const OpnPaymentsTransactionTypeSchema = z.union([z.literal('credit'), z.literal('debit')])

export const OpnPaymentsTransactionSchema = z.object({
  object: z.literal('transaction'),
  id: OpnPaymentsTransactionIdSchema,
  location: z.string(),
  amount: z.number().int(),
  created: z.string(),
  currency: z.string(),
  source: z.union([
    OpnPaymentsChargeIdSchema,
    OpnPaymentsRefundIdSchema,
    OpnPaymentsDisputeIdSchema,
    OpnPaymentsTransferIdSchema,
  ]),
  transferable: z.boolean(),
  type: OpnPaymentsTransactionTypeSchema,
})

export const OpnPaymentsTransactionListSchema = OpnPaymentsListSchema(OpnPaymentsTransactionSchema)

export type OpnPaymentsTransaction = z.infer<typeof OpnPaymentsTransactionSchema>
export type OpnPaymentsTransactionType = z.infer<typeof OpnPaymentsTransactionTypeSchema>
export type OpnPaymentsTransactionList = z.infer<typeof OpnPaymentsTransactionListSchema>
