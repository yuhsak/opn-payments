import { z } from 'zod'

export const OpnPaymentsTokenIdSchema = z.string().regex(/^tokn_/)
