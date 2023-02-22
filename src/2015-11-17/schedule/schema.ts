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
import { OpnPaymentsOccurrenceListSchema } from '../occurrence/schema'

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
  amount: z.number().int().nullable(),
  percentage_of_balance: z.number().nullable(),
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

export const OpnPaymentsScheduleWeekdaySchema = z.union([
  z.literal('sunday'),
  z.literal('monday'),
  z.literal('tuesday'),
  z.literal('wednesday'),
  z.literal('thursday'),
  z.literal('friday'),
  z.literal('saturday'),
])

export const OpnPaymentsScheduleWeekdayOfMonthSchema = z.union([
  z.literal('1st_sunday'),
  z.literal('2nd_sunday'),
  z.literal('3rd_sunday'),
  z.literal('4th_sunday'),
  z.literal('last_sunday'),
  z.literal('1st_monday'),
  z.literal('2nd_monday'),
  z.literal('3rd_monday'),
  z.literal('4th_monday'),
  z.literal('last_monday'),
  z.literal('1st_tuesday'),
  z.literal('2nd_tuesday'),
  z.literal('3rd_tuesday'),
  z.literal('4th_tuesday'),
  z.literal('last_tuesday'),
  z.literal('1st_wednesday'),
  z.literal('2nd_wednesday'),
  z.literal('3rd_wednesday'),
  z.literal('4th_wednesday'),
  z.literal('last_wednesday'),
  z.literal('1st_thursday'),
  z.literal('2nd_thursday'),
  z.literal('3rd_thursday'),
  z.literal('4th_thursday'),
  z.literal('last_thursday'),
  z.literal('1st_friday'),
  z.literal('2nd_friday'),
  z.literal('3rd_friday'),
  z.literal('4th_friday'),
  z.literal('last_friday'),
  z.literal('1st_saturday'),
  z.literal('2nd_saturday'),
  z.literal('3rd_saturday'),
  z.literal('4th_saturday'),
  z.literal('last_saturday'),
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
  on: z.record(
    z.union([z.literal('weekdays'), z.literal('days_of_month'), z.literal('weekday_of_month')]),
    z.union([
      z.number().int().array(),
      OpnPaymentsScheduleWeekdaySchema.array(),
      OpnPaymentsScheduleWeekdayOfMonthSchema,
    ]),
  ),
  occurrences: OpnPaymentsOccurrenceListSchema,
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

export const OpnPaymentsChargeScheduleListSchema = OpnPaymentsListSchema(
  OpnPaymentsChargeScheduleSchema,
)
export const OpnPaymentsTransferScheduleListSchema = OpnPaymentsListSchema(
  OpnPaymentsTransferScheduleSchema,
)
export const OpnPaymentsScheduleListSchema = OpnPaymentsListSchema(OpnPaymentsScheduleSchema)

export type OpnPaymentsChargeSchedule = z.infer<typeof OpnPaymentsChargeScheduleSchema>
export type OpnPaymentsTransferSchedule = z.infer<typeof OpnPaymentsTransferScheduleSchema>
export type OpnPaymentsSchedule = z.infer<typeof OpnPaymentsScheduleSchema>
export type OpnPaymentsSchedulePeriod = z.infer<typeof OpnPaymentsSchedulePeriodSchema>
export type OpnPaymentsScheduleStatus = z.infer<typeof OpnPaymentsScheduleStatusSchema>
export type OpnPaymentsScheduleWeekday = z.infer<typeof OpnPaymentsScheduleWeekdaySchema>
export type OpnPaymentsScheduleWeekdayOfMonth = z.infer<
  typeof OpnPaymentsScheduleWeekdayOfMonthSchema
>
export type OpnPaymentsChargeScheduleList = z.infer<typeof OpnPaymentsChargeScheduleListSchema>
export type OpnPaymentsTransferScheduleList = z.infer<typeof OpnPaymentsTransferScheduleListSchema>
export type OpnPaymentsScheduleList = z.infer<typeof OpnPaymentsScheduleListSchema>
