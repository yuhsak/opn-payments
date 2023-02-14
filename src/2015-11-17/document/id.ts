import { z } from 'zod'

export const OpnPaymentsDocumentIdSchema = z.string().regex(/^docu_/)
