import { z } from 'zod'

export const OpnPaymentsCardIdSchema = z.string().regex(/^card_/)
