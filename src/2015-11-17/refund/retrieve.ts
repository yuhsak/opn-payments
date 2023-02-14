import { get } from '../../fetch'
import {
  type OpnPaymentsList,
  type OpnPaymentsListQueryParam,
  createListQuery,
  fetchAll,
} from '../../list'
import type { OpnPaymentsRefund, OpnPaymentsRefundSchema } from './schema'

export const fetchRefund = get((chargeId: string, refundId: string) => ({
  path: `/charges/${chargeId}/refunds/${refundId}`,
}))<OpnPaymentsRefund>

export const fetchRefundsForCharge = get((chargeId: string, param?: OpnPaymentsListQueryParam) => ({
  path: `/charges/${chargeId}/refunds`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsRefundSchema>>

export const fetchRefunds = get((param?: OpnPaymentsListQueryParam) => ({
  path: '/refunds',
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsRefundSchema>>

export const fetchAllRefunds = fetchAll(fetchRefunds)
