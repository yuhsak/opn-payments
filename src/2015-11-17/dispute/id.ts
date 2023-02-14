import { z } from 'zod'

export const OpnPaymentsDisputeIdSchema = z.string().regex(/^dspt_/)
