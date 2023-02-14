import { post } from '../../fetch'
import type { OpnPaymentsRecipient } from './schema'

export type CreateOpnPaymentsRecipientPayload = {
  name: string
  type: 'individual' | 'corporation'
  description?: string
  email?: string
  metadata?: object
  tax_id?: string
  bank_account: {
    name: string
    number: string
    account_type?: string
    bank_code?: string
    branch_code?: string
    brand?: string
  }
}

export const createRecipient = post((payload: CreateOpnPaymentsRecipientPayload) => ({
  path: `/recipients`,
  body: payload,
}))<OpnPaymentsRecipient>
