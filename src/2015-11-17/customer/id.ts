import { z } from 'zod'

export const OpnPaymentsCustomerIdSchema = z.string().regex(/^cust_/)
