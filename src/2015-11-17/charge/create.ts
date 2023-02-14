import { post } from '../../fetch'
import type { OpnPaymentsCharge, OpnPaymentsChargeFailureCode } from './schema'

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

export const createCharge = post((payload: CreateOpnPaymentsChargePayload) => ({
  path: '/charges',
  body: payload,
}))<OpnPaymentsCharge, OpnPaymentsChargeFailureCode>
