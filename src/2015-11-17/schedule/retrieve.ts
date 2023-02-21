import { get } from '../../fetch'
import type {
  OpnPaymentsSchedule,
  OpnPaymentsScheduleList,
  OpnPaymentsChargeScheduleList,
  OpnPaymentsTransferScheduleList,
} from './schema'
import { createListQuery, fetchAll, type OpnPaymentsListQueryParam } from '../../list'

export const fetchSchedule = get((scheduleId: string) => ({
  path: `/schedules/${scheduleId}`,
}))<OpnPaymentsSchedule>

export const fetchSchedules = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/schedules`,
  query: createListQuery(param),
}))<OpnPaymentsScheduleList>

export const fetchAllSchedules = fetchAll(fetchSchedules)

export const fetchChargeSchedules = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/charges/schedules`,
  query: createListQuery(param),
}))<OpnPaymentsChargeScheduleList>

export const fetchAllChargeSchedules = fetchAll(fetchChargeSchedules)

export const fetchTransferSchedules = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/transfers/schedules`,
  query: createListQuery(param),
}))<OpnPaymentsTransferScheduleList>

export const fetchAllTransferSchedules = fetchAll(fetchTransferSchedules)

export const fetchChargeSchedulesForCustomer = get(
  (customerId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/customers/${customerId}/schedules`,
    query: createListQuery(param),
  }),
)<OpnPaymentsChargeScheduleList>

export const fetchTransferSchedulesForRecipient = get(
  (recipientId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/recipients/${recipientId}/schedules`,
    query: createListQuery(param),
  }),
)<OpnPaymentsTransferScheduleList>
