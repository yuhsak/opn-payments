import { z } from 'zod'

export const OpnPaymentsOccurrenceIdSchema = z.string().regex(/^occu_/)
