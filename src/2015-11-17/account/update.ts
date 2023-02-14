import { patch } from '../../fetch'
import type { OpnPaymentsAccount } from './schema'

export type UpdateOpnPaymentsAccountPayload = {
  chain_enabled?: boolean
  chain_return_uri?: string
  metadata_export_keys?: Record<string, string[]>
  webhook_uri?: string
  zero_interest_installments?: boolean
}

export const updateAccount = patch((payload: UpdateOpnPaymentsAccountPayload) => ({
  path: `/account`,
  body: payload,
}))<OpnPaymentsAccount>
