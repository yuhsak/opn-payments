import { z } from 'zod'

export const OpnPaymentsLinkIdSchema = z.string().regex(/^link_/)
