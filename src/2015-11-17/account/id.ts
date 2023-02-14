import { z } from 'zod'

export const OpnPaymentsAccountIdSchema = z.string().regex(/^acct_/)
