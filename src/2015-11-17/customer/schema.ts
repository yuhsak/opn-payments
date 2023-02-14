import { z } from 'zod'
import { OpnPaymentsListSchema } from '../../list'
import { OpnPaymentsCardSchema } from '../card'
import { OpnPaymentsCardIdSchema } from '../card/id'
import { OpnPaymentsCustomerIdSchema } from './id'

export const OpnPaymentsCustomerSchema = z.object({
  object: z.literal('customer'),
  id: OpnPaymentsCustomerIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  metadata: z.unknown(),
  cards: OpnPaymentsListSchema(OpnPaymentsCardSchema),
  default_card: OpnPaymentsCardIdSchema.nullable(),
  description: z.string().nullable(),
  email: z.string().nullable(),
  created: z.string(),
})

export const OpnPaymentsDeletedCustomerSchema = z.object({
  object: z.literal('customer'),
  id: OpnPaymentsCustomerIdSchema,
  livemode: z.boolean(),
  deleted: z.literal('true'),
})

export type OpnPaymentsCustomer = z.infer<typeof OpnPaymentsCustomerSchema>
export type OpnPaymentsDeletedCustomer = z.infer<typeof OpnPaymentsDeletedCustomerSchema>
