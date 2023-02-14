import type { OpnPaymentsRefund } from './schema'
import { post } from '../../fetch'

export type CreateOpnPaymentsRefundPayload = {
  amount: number
  metadata?: object
  void?: boolean
}

export type CreateOpnPaymentsRefundErrorCode = (string & {}) | 'failed_refund'

export const createRefund = post((chargeId: string, payload: CreateOpnPaymentsRefundPayload) => ({
  path: `/charges/${chargeId}/refunds`,
  body: payload,
}))<OpnPaymentsRefund, CreateOpnPaymentsRefundErrorCode>
