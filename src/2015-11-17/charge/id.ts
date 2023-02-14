import { z } from 'zod'

export const OpnPaymentsChargeIdSchema = z.string().regex(/^chrg_/)
