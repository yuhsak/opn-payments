import { patch } from '../../fetch'
import type { OpnPaymentsRecipient } from './schema'

export type UpdateOpnPaymentsRecipientPayload = {
  name?: string
  type?: 'individual' | 'corporation'
  description?: string
  email?: string
  metadata?: object
  tax_id?: string
  bank_account?: {
    name?: string
    number?: string
    account_type?: string
    bank_code?: string
    branch_code?: string
    brand?: string
  }
}

export const updateRecipient = patch(
  (recipientId: string, payload: UpdateOpnPaymentsRecipientPayload) => ({
    path: `/recipients/${recipientId}`,
    body: payload,
  }),
)<OpnPaymentsRecipient>
