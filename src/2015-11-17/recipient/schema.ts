import { z } from 'zod'
import { OpnPaymentsRecipientIdSchema } from './id'
import { OpnPaymentsBankAccountSchema } from '../bank-account'
import { OpnPaymentsScheduledTransferSchema } from '../schedule/schema'

export const OpnPaymentsRecipientFailureCodeSchema = z.union([
  z.literal('name_mismatch'),
  z.literal('account_not_found'),
  z.literal('bank_not_found'),
])

export const OpnPaymentsRecipientTypeSchema = z.union([
  z.literal('individual'),
  z.literal('corporation'),
])

export const OpnPaymentsRecipientSchema = z.object({
  object: z.literal('recipient'),
  id: OpnPaymentsRecipientIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  activated_at: z.string().nullable(),
  active: z.boolean(),
  bank_account: OpnPaymentsBankAccountSchema,
  created: z.string(),
  default: z.boolean(),
  deleted: z.boolean(),
  description: z.string().nullable(),
  email: z.string().nullable(),
  failure_code: OpnPaymentsRecipientFailureCodeSchema.nullable(),
  metadata: z.unknown(),
  name: z.string(),
  schedule: OpnPaymentsScheduledTransferSchema.nullable(),
  tax_id: z.string().nullable(),
  type: OpnPaymentsRecipientTypeSchema,
  verified: z.boolean(),
  verified_at: z.string().nullable(),
})

export type OpnPaymentsRecipient = z.infer<typeof OpnPaymentsRecipientSchema>
export type OpnPaymentsRecipientFailureCode = z.infer<typeof OpnPaymentsRecipientFailureCodeSchema>
export type OpnPaymentsRecipientType = z.infer<typeof OpnPaymentsRecipientTypeSchema>
