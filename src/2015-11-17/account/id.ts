import { z } from 'zod'

export const OpnPaymentsAccountIdSchema = z.string().regex(/^account_/)
