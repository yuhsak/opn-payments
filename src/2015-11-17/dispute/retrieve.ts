import { get } from '../../fetch'
import type { OpnPaymentsDispute, OpnPaymentsDisputeList } from './schema'
import {
  createListQuery,
  fetchAll,
  type OpnPaymentsListQueryParam,
  type OpnPaymentsList,
} from '../../list'

export const fetchDispute = get((disputeId: string) => ({
  path: `/disputes/${disputeId}`,
}))<OpnPaymentsDispute>

export const fetchDisputes = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/disputes`,
  query: createListQuery(param),
}))<OpnPaymentsDisputeList>

export const fetchAllDisputes = fetchAll(fetchDisputes)

export const fetchClosedDisputes = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/disputes/closed`,
  query: createListQuery(param),
}))<OpnPaymentsDisputeList>

export const fetchAllClosedDisputes = fetchAll(fetchClosedDisputes)

export const fetchOpenDisputes = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/disputes/open`,
  query: createListQuery(param),
}))<OpnPaymentsDisputeList>

export const fetchAllOpenDisputes = fetchAll(fetchOpenDisputes)

export const fetchPendingDisputes = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/disputes/pending`,
  query: createListQuery(param),
}))<OpnPaymentsDisputeList>

export const fetchAllPendingDisputes = fetchAll(fetchPendingDisputes)
