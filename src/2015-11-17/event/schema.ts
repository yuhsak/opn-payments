import { z } from 'zod'
import { OpnPaymentsEventIdSchema } from './id'
import { OpnPaymentsListSchema } from '../../list'
import { OpnPaymentsChargeSchema } from '../charge/schema'
import { OpnPaymentsCardSchema, OpnPaymentsDeletedCardSchema } from '../card/schema'
import { OpnPaymentsCustomerSchema, OpnPaymentsDeletedCustomerSchema } from '../customer/schema'
import { OpnPaymentsDisputeSchema } from '../dispute/schema'
import { OpnPaymentsRecipientSchema } from '../recipient/schema'
import { OpnPaymentsRefundSchema } from '../refund/schema'
import { OpnPaymentsTransferSchema } from '../transfer/schema'
import { OpnPaymentsScheduleSchema } from '../schedule/schema'

export const OpnPaymentsEventKeyForChargeSchema = z.union([
  z.literal('charge.create'),
  z.literal('charge.update'),
  z.literal('charge.capture'),
  z.literal('charge.reverse'),
  z.literal('charge.complete'),
])

export const OpnPaymentsEventKeyForCustomerSchema = z.union([
  z.literal('customer.create'),
  z.literal('customer.update'),
  z.literal('customer.update.card'),
])
export const OpnPaymentsEventKeyForDeletedCustomerSchema = z.literal('customer.destroy')

export const OpnPaymentsEventKeyForCardSchema = z.literal('card.update')
export const OpnPaymentsEventKeyForDeletedCardSchema = z.literal('card.destroy')

export const OpnPaymentsEventKeyForDisputeSchema = z.union([
  z.literal('dispute.create'),
  z.literal('dispute.update'),
  z.literal('dispute.close'),
])

export const OpnPaymentsEventKeyForRecipientSchema = z.union([
  z.literal('recipient.create'),
  z.literal('recipient.update'),
  z.literal('recipient.destroy'),
  z.literal('recipient.activate'),
  z.literal('recipient.deactivate'),
  z.literal('recipient.verify'),
])

export const OpnPaymentsEventKeyForRefundSchema = z.literal('refund.create')

export const OpnPaymentsEventKeyForTransferSchema = z.union([
  z.literal('transfer.create'),
  z.literal('transfer.update'),
  z.literal('transfer.destroy'),
  z.literal('transfer.send'),
  z.literal('transfer.pay'),
])

export const OpnPaymentsEventKeyForScheduleSchema = z.union([
  z.literal('schedule.create'),
  z.literal('schedule.suspend'),
  z.literal('schedule.destroy'),
])

export const OpnPaymentsEventKeySchema = z.union([
  OpnPaymentsEventKeyForChargeSchema,
  OpnPaymentsEventKeyForCustomerSchema,
  OpnPaymentsEventKeyForDeletedCustomerSchema,
  OpnPaymentsEventKeyForCardSchema,
  OpnPaymentsEventKeyForDeletedCardSchema,
  OpnPaymentsEventKeyForDisputeSchema,
  OpnPaymentsEventKeyForRecipientSchema,
  OpnPaymentsEventKeyForRefundSchema,
  OpnPaymentsEventKeyForTransferSchema,
  OpnPaymentsEventKeyForScheduleSchema,
])

const OpnPaymentsEventSchemaBase = z.object({
  object: z.literal('event'),
  id: OpnPaymentsEventIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  created: z.string(),
})

export const OpnPaymentsChargeEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForChargeSchema,
  data: OpnPaymentsChargeSchema,
})

export const OpnPaymentsCustomerEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForCustomerSchema,
  data: OpnPaymentsCustomerSchema,
})

export const OpnPaymentsDeletedCustomerEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForDeletedCustomerSchema,
  data: OpnPaymentsDeletedCustomerSchema,
})

export const OpnPaymentsCardEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForCardSchema,
  data: OpnPaymentsCardSchema,
})

export const OpnPaymentsDeletedCardEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForDeletedCardSchema,
  data: OpnPaymentsDeletedCardSchema,
})

export const OpnPaymentsDisputeEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForDisputeSchema,
  data: OpnPaymentsDisputeSchema,
})

export const OpnPaymentsRecipientEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForRecipientSchema,
  data: OpnPaymentsRecipientSchema,
})

export const OpnPaymentsRefundEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForRefundSchema,
  data: OpnPaymentsRefundSchema,
})

export const OpnPaymentsTransferEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForTransferSchema,
  data: OpnPaymentsTransferSchema,
})

export const OpnPaymentsScheduleEventSchema = OpnPaymentsEventSchemaBase.extend({
  key: OpnPaymentsEventKeyForScheduleSchema,
  data: OpnPaymentsScheduleSchema,
})

export const OpnPaymentsEventSchema = z.union([
  OpnPaymentsChargeEventSchema,
  OpnPaymentsCustomerEventSchema,
  OpnPaymentsDeletedCustomerEventSchema,
  OpnPaymentsCardEventSchema,
  OpnPaymentsDeletedCardEventSchema,
  OpnPaymentsDisputeEventSchema,
  OpnPaymentsRecipientEventSchema,
  OpnPaymentsRefundEventSchema,
  OpnPaymentsTransferEventSchema,
  OpnPaymentsScheduleEventSchema,
])

export const OpnPaymentsEventListSchema = OpnPaymentsListSchema(OpnPaymentsEventSchema)

export type OpnPaymentsEventKeyForCharge = z.infer<typeof OpnPaymentsEventKeyForChargeSchema>
export type OpnPaymentsEventKeyForCustomer = z.infer<typeof OpnPaymentsEventKeyForCustomerSchema>
export type OpnPaymentsEventKeyForDeletedCustomer = z.infer<
  typeof OpnPaymentsEventKeyForDeletedCustomerSchema
>
export type OpnPaymentsEventKeyForCard = z.infer<typeof OpnPaymentsEventKeyForCardSchema>
export type OpnPaymentsEventKeyForDeletedCard = z.infer<
  typeof OpnPaymentsEventKeyForDeletedCardSchema
>
export type OpnPaymentsEventKeyForDispute = z.infer<typeof OpnPaymentsEventKeyForDisputeSchema>
export type OpnPaymentsEventKeyForRecipient = z.infer<typeof OpnPaymentsEventKeyForRecipientSchema>
export type OpnPaymentsEventKeyForRefund = z.infer<typeof OpnPaymentsEventKeyForRefundSchema>
export type OpnPaymentsEventKeyForTransfer = z.infer<typeof OpnPaymentsEventKeyForTransferSchema>
export type OpnPaymentsEventKeyForSchedule = z.infer<typeof OpnPaymentsEventKeyForScheduleSchema>
export type OpnPaymentsEventKey = z.infer<typeof OpnPaymentsEventKeySchema>

export type OpnPaymentsChargeEvent = z.infer<typeof OpnPaymentsChargeEventSchema>
export type OpnPaymentsCustomerEvent = z.infer<typeof OpnPaymentsCustomerEventSchema>
export type OpnPaymentDeletedsCustomerEvent = z.infer<typeof OpnPaymentsDeletedCustomerEventSchema>
export type OpnPaymentsCardEvent = z.infer<typeof OpnPaymentsCardEventSchema>
export type OpnPaymentsDeletedCardEvent = z.infer<typeof OpnPaymentsDeletedCardEventSchema>
export type OpnPaymentsDisputeEvent = z.infer<typeof OpnPaymentsDisputeEventSchema>
export type OpnPaymentsRecipientEvent = z.infer<typeof OpnPaymentsRecipientEventSchema>
export type OpnPaymentsRefundEvent = z.infer<typeof OpnPaymentsRefundEventSchema>
export type OpnPaymentsTransferEvent = z.infer<typeof OpnPaymentsTransferEventSchema>
export type OpnPaymentsScheduleEvent = z.infer<typeof OpnPaymentsScheduleEventSchema>
export type OpnPaymentsEvent = z.infer<typeof OpnPaymentsEventSchema>

export type OpnPaymentsEventList = z.infer<typeof OpnPaymentsEventListSchema>
