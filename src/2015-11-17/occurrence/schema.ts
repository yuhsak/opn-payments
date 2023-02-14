import { z } from 'zod'
import { OpnPaymentsOccurrenceIdSchema } from './id'
import { OpnPaymentsChargeIdSchema } from '../charge/id'
import { OpnPaymentsTransferIdSchema } from '../transfer/id'
import { OpnPaymentsScheduleIdSchema } from '../schedule/id'

export const OpnPaymentsOccurrenceStatusSchema = z.union([
  z.literal('skipped'),
  z.literal('failed'),
  z.literal('successful'),
])

export const OpnPaymentsOccurrenceSchema = z.object({
  object: z.literal('occurrence'),
  id: OpnPaymentsOccurrenceIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  created: z.string(),
  message: z.string().nullable(),
  processed_at: z.string(),
  result: z.union([OpnPaymentsChargeIdSchema, OpnPaymentsTransferIdSchema]),
  retry_date: z.string().nullable(),
  schedule: OpnPaymentsScheduleIdSchema,
  schedule_date: z.string(),
  status: OpnPaymentsOccurrenceStatusSchema,
})

export type OpnPaymentsOccurrence = z.infer<typeof OpnPaymentsOccurrenceSchema>
export type OpnPaymentsOccurrenceStatus = z.infer<typeof OpnPaymentsOccurrenceStatusSchema>
