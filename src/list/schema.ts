import { z } from 'zod'

export const OpnPaymentsListSchema = <T extends z.ZodType<Record<string, any>>>(entity: T) => {
  return z.object({
    object: z.literal('list'),
    limit: z.number().int(),
    offset: z.number().int(),
    total: z.number().int(),
    location: z.string(),
    order: z.union([z.literal('chronological'), z.literal('reverse_chronological')]),
    from: z.string(),
    to: z.string(),
    data: z.array(entity),
  })
}

export type OpnPaymentsList<T extends z.ZodType<Record<string, any>>> = z.infer<
  ReturnType<typeof OpnPaymentsListSchema<T>>
>

export type __OpnPaymentsListType<T> = {
  object: 'list'
  limit: number
  offset: number
  total: number
  location: string
  order: 'chronological' | 'reverse_chronological'
  from: string
  to: string
  data: T[]
}
