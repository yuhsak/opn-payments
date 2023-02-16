import { post } from '../../fetch'
import type { OpnPaymentsCharge } from './schema'

export type CreateOpnPaymentsChargePayload = {
  amount: number
  currency: string
  capture?: boolean
  card?: string
  customer?: string
  description?: string
  expires_at?: string
  ip?: string
  metadata?: any
  platform_fee?: any
  return_uri?: string
  source?: string
  zero_interest_installments?: boolean
}

export type OpnPaymentsChargeErrorCode =
  | (string & {})
  | 'invalid_amount'
  | 'invalid_charge'
  | 'not_found'

export const createCharge = post((payload: CreateOpnPaymentsChargePayload) => ({
  path: '/charges',
  body: payload,
}))<OpnPaymentsCharge, OpnPaymentsChargeErrorCode>
