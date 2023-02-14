import { z } from 'zod'

import { OpnPaymentsAccountIdSchema } from './id'

export const OpnPaymentsAccountSchema = z.object({
  object: z.literal('account'),
  id: OpnPaymentsAccountIdSchema,
  livemode: z.boolean(),
  location: z.string(),
  api_version: z.string(),
  auto_activate_recipients: z.boolean(),
  chain_enabled: z.boolean(),
  chain_return_uri: z.string().nullable(),
  country: z.string(),
  created: z.string(),
  currency: z.string(),
  email: z.string(),
  metadata_export_keys: z.record(z.string().array()),
  supported_currencies: z.string().array(),
  webhook_uri: z.string().nullable(),
  zero_interest_installments: z.boolean(),
})

export type OpnPaymentsAccount = z.infer<typeof OpnPaymentsAccountSchema>
