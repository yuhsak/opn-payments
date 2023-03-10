import { z } from 'zod'
import { OpnPaymentsDisputeIdSchema } from './id'
import { OpnPaymentsChargeIdSchema } from '../charge/id'
import { OpnPaymentsTransactionIdSchema } from '../transaction/id'
import { OpnPaymentsListSchema } from '../../list'
import { OpnPaymentsDocumentListSchema } from '../document/schema'

export const OpnPaymentsDisputeStatusSchema = z.union([
  z.literal('open'),
  z.literal('pending'),
  z.literal('won'),
  z.literal('lost'),
])

export const OpnPaymentsDisputeSchema = z.object({
  object: z.literal('dispute'),
  id: OpnPaymentsDisputeIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  admin_message: z.string().nullable(),
  amount: z.number().int(),
  charge: OpnPaymentsChargeIdSchema,
  closed_at: z.string().nullable(),
  created: z.string(),
  currency: z.string(),
  documents: OpnPaymentsDocumentListSchema,
  message: z.string().nullable(),
  metadata: z.unknown(),
  reason_code: z.string(),
  reason_message: z.string().nullable(),
  status: OpnPaymentsDisputeStatusSchema,
  transaction: OpnPaymentsTransactionIdSchema,
})

export const OpnPaymentsDisputeListSchema = OpnPaymentsListSchema(OpnPaymentsDisputeSchema)

export type OpnPaymentsDispute = z.infer<typeof OpnPaymentsDisputeSchema>
export type OpnPaymentsDisputeStatus = z.infer<typeof OpnPaymentsDisputeStatusSchema>
export type OpnPaymentsDisputeList = z.infer<typeof OpnPaymentsDisputeListSchema>
