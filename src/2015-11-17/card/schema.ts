import { z } from 'zod'
import { OpnPaymentsCardIdSchema } from './id'
import { OpnPaymentsListSchema } from '../../list'

export const OpnPaymentsCardSchema = z.object({
  object: z.literal('card'),
  id: OpnPaymentsCardIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  security_code_check: z.boolean(),
  expiration_month: z.number().int(),
  expiration_year: z.number().int(),
  bank: z.string(),
  brand: z.string(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  financing: z.string(),
  fingerprint: z.string(),
  first_digits: z.string().nullable(),
  last_digits: z.string().nullable(),
  name: z.string(),
  phone_number: z.string().nullable(),
  postal_code: z.string().nullable(),
  state: z.string().nullable(),
  street1: z.string().nullable(),
  street2: z.string().nullable(),
  tokenization_method: z.string().nullable(),
  created: z.string(),
})

export const OpnPaymentsDeletedCardSchema = z.object({
  object: z.literal('card'),
  id: OpnPaymentsCardIdSchema,
  livemode: z.boolean(),
  deleted: z.literal(true),
})

export const OpnPaymentsCardFromTokenSchema = OpnPaymentsCardSchema.omit({ location: true })

export const OpnPaymentsCardListSchema = OpnPaymentsListSchema(OpnPaymentsCardSchema)

export type OpnPaymentsCard = z.infer<typeof OpnPaymentsCardSchema>
export type OpnPaymentsDeletedCard = z.infer<typeof OpnPaymentsDeletedCardSchema>
export type OpnPaymentsCardFromToken = z.infer<typeof OpnPaymentsCardFromTokenSchema>
export type OpnPaymentsCardList = z.infer<typeof OpnPaymentsCardListSchema>
