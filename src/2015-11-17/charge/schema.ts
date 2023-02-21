import { z } from 'zod'

import { OpnPaymentsListSchema } from '../../list'
import { OpnPaymentsChargeIdSchema } from './id'
import { OpnPaymentsCustomerIdSchema } from '../customer/id'
import { OpnPaymentsTransactionIdSchema } from '../transaction/id'
import {
  OpnPaymentsCardSchema,
  OpnPaymentsDeletedCardSchema,
  OpnPaymentsCardFromTokenSchema,
} from '../card/schema'
import { OpnPaymentsRefundListSchema } from '../refund/schema'
import { OpnPaymentsDisputeSchema } from '../dispute/schema'

export const OpnPaymentsChargeFailureCodeSchema = z.union([
  z.literal('confirmed_amount_mismatch'),
  z.literal('failed_fraud_check'),
  z.literal('failed_processing'),
  z.literal('insufficient_balance'),
  z.literal('insufficient_fund'),
  z.literal('invalid_account_number'),
  z.literal('invalid_account'),
  z.literal('invalid_security_code'),
  z.literal('payment_cancelled'),
  z.literal('payment_rejected'),
  z.literal('stolen_or_lost_card'),
  z.literal('timeout'),
])

export const OpnPaymentsChargeStatusSchema = z.union([
  z.literal('failed'),
  z.literal('expired'),
  z.literal('pending'),
  z.literal('reversed'),
  z.literal('successful'),
])

export const OpnPaymentsChargeSchema = z.object({
  object: z.literal('charge'),
  id: OpnPaymentsChargeIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  amount: z.number().int(),
  authorize_uri: z.string().nullable(),
  authorized: z.boolean(),
  branch: z.string().nullable(),
  capturable: z.boolean(),
  capture: z.boolean(),
  card: z
    .union([OpnPaymentsCardSchema, OpnPaymentsDeletedCardSchema, OpnPaymentsCardFromTokenSchema])
    .nullable(),
  created: z.string(),
  currency: z.string(),
  customer: OpnPaymentsCustomerIdSchema.nullable(),
  description: z.string().nullable(),
  device: z.string().nullable(),
  disputable: z.boolean(),
  dispute: OpnPaymentsDisputeSchema.nullable(),
  expired: z.boolean(),
  expired_at: z.string().nullable(),
  expires_at: z.string().nullable(),
  failure_code: OpnPaymentsChargeFailureCodeSchema.nullable(),
  failure_message: z.string().nullable(),
  funding_amount: z.number().int(),
  funding_currency: z.string(),
  ip: z.string().nullable(),
  link: z.string().nullable(),
  metadata: z.unknown(),
  offline: z.string().nullable(),
  offsite: z.string().nullable(),
  paid: z.boolean(),
  paid_at: z.string().nullable(),
  reference: z.string().nullable(),
  refundable: z.boolean(),
  refunded: z.number().int(),
  refunds: OpnPaymentsRefundListSchema,
  return_uri: z.string().nullable(),
  reversed: z.boolean(),
  reversed_at: z.string().nullable(),
  reversible: z.boolean(),
  schedule: z.string().nullable(),
  source_of_fund: z.string().nullable(),
  status: OpnPaymentsChargeStatusSchema,
  terminal: z.string().nullable(),
  transaction: OpnPaymentsTransactionIdSchema.nullable(),
  transaction_fees: z.record(z.string()),
  unmanaged_payment: z.record(z.string().nullable()).optional(),
  voided: z.boolean(),
})

export const OpnPaymentsChargeListSchema = OpnPaymentsListSchema(OpnPaymentsChargeSchema)

export type OpnPaymentsCharge = z.infer<typeof OpnPaymentsChargeSchema>
export type OpnPaymentsChargeFailureCode = z.infer<typeof OpnPaymentsChargeFailureCodeSchema>
export type OpnPaymentsChargeStatus = z.infer<typeof OpnPaymentsChargeStatusSchema>
export type OpnPaymentsChargeList = z.infer<typeof OpnPaymentsChargeListSchema>
