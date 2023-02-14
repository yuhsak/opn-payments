import { z } from 'zod'

export const OpnPaymentsTransactionIdSchema = z.string().regex(/^trxn_/)
