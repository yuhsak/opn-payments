import { z } from 'zod'

export const OpnPaymentsBankAccountSchema = z.object({
  object: z.literal('bank_account'),
  account_type: z.string().optional(),
  bank_code: z.string().optional(),
  branch_code: z.string().optional(),
  brand: z.string().optional(),
  created: z.string(),
  last_digits: z.string(),
  name: z.string(),
})

export type OpnPaymentsBankAccount = z.infer<typeof OpnPaymentsBankAccountSchema>
