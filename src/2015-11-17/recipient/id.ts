import { z } from 'zod'

export const OpnPaymentsRecipientIdSchema = z.string().regex(/^recp_/)
