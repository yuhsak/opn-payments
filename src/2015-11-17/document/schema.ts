import { z } from 'zod'
import { OpnPaymentsDocumentIdSchema } from './id'
import { OpnPaymentsListSchema } from '../../list'

export const OpnPaymentsDocumentSchema = z.object({
  object: z.literal('document'),
  id: OpnPaymentsDocumentIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  created: z.string(),
  deleted: z.boolean(),
  download_uri: z.string(),
  filename: z.string(),
  kind: z.string(),
})

export const OpnPaymentsDocumentListSchema = OpnPaymentsListSchema(OpnPaymentsDocumentSchema)

export type OpnPaymentsDocument = z.infer<typeof OpnPaymentsDocumentSchema>
export type OpnPaymentsDocumentList = z.infer<typeof OpnPaymentsDocumentListSchema>
