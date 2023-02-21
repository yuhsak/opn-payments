import { z } from 'zod'

export const OpnPaymentsEventIdSchema = z.string().regex(/^evnt_/)
