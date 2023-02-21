import { get } from '../../fetch'
import { type OpnPaymentsListQueryParam, createListQuery, fetchAll } from '../../list'
import type { OpnPaymentsRefund, OpnPaymentsRefundList } from './schema'

export const fetchRefund = get((chargeId: string, refundId: string) => ({
  path: `/charges/${chargeId}/refunds/${refundId}`,
}))<OpnPaymentsRefund>

export const fetchRefundsForCharge = get((chargeId: string, param?: OpnPaymentsListQueryParam) => ({
  path: `/charges/${chargeId}/refunds`,
  query: createListQuery(param),
}))<OpnPaymentsRefundList>

export const fetchRefunds = get((param?: OpnPaymentsListQueryParam) => ({
  path: '/refunds',
  query: createListQuery(param),
}))<OpnPaymentsRefundList>

export const fetchAllRefunds = fetchAll(fetchRefunds)
