import { get } from '../../fetch'
import type {
  OpnPaymentsSchedule,
  OpnPaymentsScheduleSchema,
  OpnPaymentsChargeScheduleSchema,
  OpnPaymentsTransferScheduleSchema,
} from './schema'
import {
  createListQuery,
  fetchAll,
  type OpnPaymentsList,
  type OpnPaymentsListQueryParam,
} from '../../list'

export const fetchSchedule = get((scheduleId: string) => ({
  path: `/schedules/${scheduleId}`,
}))<OpnPaymentsSchedule>

export const fetchSchedules = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/schedules`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsScheduleSchema>>

export const fetchAllSchedules = fetchAll(fetchSchedules)

export const fetchChargeSchedules = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/charges/schedules`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsChargeScheduleSchema>>

export const fetchAllChargeSchedules = fetchAll(fetchChargeSchedules)

export const fetchTransferSchedules = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/transfers/schedules`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsTransferScheduleSchema>>

export const fetchAllTransferSchedules = fetchAll(fetchTransferSchedules)

export const fetchChargeSchedulesForCustomer = get(
  (customerId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/customers/${customerId}/schedules`,
    query: createListQuery(param),
  }),
)<OpnPaymentsList<typeof OpnPaymentsChargeScheduleSchema>>

export const fetchTransferSchedulesForRecipient = get(
  (recipientId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/recipients/${recipientId}/schedules`,
    query: createListQuery(param),
  }),
)<OpnPaymentsList<typeof OpnPaymentsTransferScheduleSchema>>
