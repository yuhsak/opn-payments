import { get } from '../../fetch'
import { createListQuery, fetchAll, type OpnPaymentsListQueryParam } from '../../list'
import type { OpnPaymentsCharge, OpnPaymentsChargeList } from './schema'

export const fetchCharge = get((chargeId: string) => ({
  path: `/charges/${chargeId}`,
}))<OpnPaymentsCharge>

export const fetchChargesForLink = get((linkId: string, param?: OpnPaymentsListQueryParam) => ({
  path: `/links/${linkId}/charges`,
  query: createListQuery(param),
}))<OpnPaymentsChargeList>

export const fetchCharges = get((param?: OpnPaymentsListQueryParam) => ({
  path: '/charges',
  query: createListQuery(param),
}))<OpnPaymentsChargeList>

export const fetchAllCharges = fetchAll(fetchCharges)
