import { z } from 'zod'
import { OpnPaymentsTransferIdSchema } from './id'
import { OpnPaymentsBankAccountSchema } from '../bank-account'
import { OpnPaymentsRecipientIdSchema } from '../recipient/id'
import { OpnPaymentsScheduleIdSchema } from '../schedule/id'
import { OpnPaymentsTransactionIdSchema } from '../transaction/id'

export const OpnPaymentsTransferFailureCodeSchema = z.union([
  z.literal('insufficient_balance'),
  z.literal('invalid_recipient'),
  z.literal('transfer_suspended'),
  z.literal('transfer_deleted'),
  z.literal('transfer_sent'),
  z.literal('transfer_failed'),
])

export const OpnPaymentsTransferSchema = z.object({
  object: z.literal('transfer'),
  id: OpnPaymentsTransferIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  amount: z.number().int(),
  bank_account: OpnPaymentsBankAccountSchema,
  created: z.string(),
  currency: z.string(),
  deleted: z.boolean(),
  fail_fast: z.boolean(),
  failure_code: OpnPaymentsTransferFailureCodeSchema.nullable(),
  failure_message: z.string().nullable(),
  fee: z.number().int(),
  metadata: z.unknown(),
  paid: z.boolean(),
  paid_at: z.string().nullable(),
  recipient: OpnPaymentsRecipientIdSchema,
  schedule: OpnPaymentsScheduleIdSchema.nullable(),
  sent: z.boolean(),
  sent_at: z.string().nullable(),
  transaction: OpnPaymentsTransactionIdSchema,
})

export type OpnPaymentsTransfer = z.infer<typeof OpnPaymentsTransferSchema>
export type OpnPaymentsTransferFailureCode = z.infer<typeof OpnPaymentsTransferFailureCodeSchema>
