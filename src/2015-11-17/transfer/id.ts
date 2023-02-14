import { z } from 'zod'

export const OpnPaymentsTransferIdSchema = z.string().regex(/^trsf_/)
