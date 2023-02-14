import { z } from 'zod'
import {
  OpnPaymentsScheduleIdSchema,
  OpnPaymentsScheduledChargeIdSchema,
  OpnPaymentsScheduledTransferIdSchema,
} from './id'
import { OpnPaymentsCardIdSchema } from '../card/id'
import { OpnPaymentsCustomerIdSchema } from '../customer/id'
import { OpnPaymentsRecipientIdSchema } from '../recipient/id'
import { OpnPaymentsListSchema } from '../../list'
import { OpnPaymentsOccurrenceSchema } from '../occurrence'

export const OpnPaymentsScheduledChargeSchema = z.object({
  object: z.literal('scheduled_charge'),
  id: OpnPaymentsScheduledChargeIdSchema,
  livemode: z.boolean(),
  currency: z.string(),
  amount: z.number().int(),
  card: OpnPaymentsCardIdSchema.nullable(),
  customer: OpnPaymentsCustomerIdSchema,
  description: z.string().nullable(),
  metadata: z.unknown(),
})

export type OpnPaymentsScheduledCharge = z.infer<typeof OpnPaymentsScheduledChargeSchema>

export const OpnPaymentsScheduledTransferSchema = z.object({
  object: z.literal('scheduled_transfer'),
  id: OpnPaymentsScheduledTransferIdSchema,
  livemode: z.boolean(),
  currency: z.string(),
  amount: z.number().int(),
  percentage_of_balance: z.number(),
  recipient: OpnPaymentsRecipientIdSchema,
})

export type OpnPaymentsScheduledTransfer = z.infer<typeof OpnPaymentsScheduledTransferSchema>

export const OpnPaymentsSchedulePeriodSchema = z.union([
  z.literal('month'),
  z.literal('week'),
  z.literal('day'),
])

export const OpnPaymentsScheduleStatusSchema = z.union([
  z.literal('active'),
  z.literal('expiring'),
  z.literal('expired'),
  z.literal('deleted'),
  z.literal('suspended'),
])

const OpnPaymentsPlainScheduleSchema = z.object({
  object: z.literal('schedule'),
  id: OpnPaymentsScheduleIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  next_occurrence_dates: z.string().array(),
  deleted: z.boolean(),
  end_date: z.string(),
  start_date: z.string(),
  period: OpnPaymentsSchedulePeriodSchema,
  every: z.number().int(),
  on: z.record(z.number().int().array()),
  occurrences: OpnPaymentsListSchema(OpnPaymentsOccurrenceSchema),
  in_words: z.string(),
  status: OpnPaymentsScheduleStatusSchema,
  created: z.string(),
  ended_at: z.string().nullable(),
  active: z.boolean(),
})

export const OpnPaymentsChargeScheduleSchema = OpnPaymentsPlainScheduleSchema.extend({
  charge: OpnPaymentsScheduledChargeSchema,
})

export const OpnPaymentsTransferScheduleSchema = OpnPaymentsPlainScheduleSchema.extend({
  transfer: OpnPaymentsScheduledTransferSchema,
})

export const OpnPaymentsScheduleSchema = z.union([
  OpnPaymentsChargeScheduleSchema,
  OpnPaymentsTransferScheduleSchema,
])

export type OpnPaymentsChargeSchedule = z.infer<typeof OpnPaymentsChargeScheduleSchema>
export type OpnPaymentsTransferSchedule = z.infer<typeof OpnPaymentsTransferScheduleSchema>
export type OpnPaymentsSchedule = z.infer<typeof OpnPaymentsScheduleSchema>
export type OpnPaymentsSchedulePeriod = z.infer<typeof OpnPaymentsSchedulePeriodSchema>
export type OpnPaymentsScheduleStatus = z.infer<typeof OpnPaymentsScheduleStatusSchema>
