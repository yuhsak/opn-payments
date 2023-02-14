import { z } from 'zod'

export const OpnPaymentsRefundIdSchema = z.string().regex(/^rfnd_/)
