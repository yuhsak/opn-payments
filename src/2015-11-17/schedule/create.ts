import { post } from '../../fetch'
import type { OpnPaymentsChargeSchedule, OpnPaymentsTransferSchedule } from './schema'

type CreateOpnPaymentsSchedulePayloadBase = {
  start_date: string
  end_date: string
  period: 'day' | 'week' | 'month'
  every: number
  on?: object
}

export type CreateOpnPaymentsChargeSchedulePayload = CreateOpnPaymentsSchedulePayloadBase & {
  charge: {
    customer: string
    card?: string
    currency?: string
    amount: number
    description?: string
    metadata?: unknown
  }
}

export const createChargeSchedule = post((payload: CreateOpnPaymentsChargeSchedulePayload) => ({
  path: `/schedules`,
  body: payload,
}))<OpnPaymentsChargeSchedule>

export type CreateOpnPaymentsTransferSchedulePayload = CreateOpnPaymentsSchedulePayloadBase & {
  transfer: {
    recipient: string
    currency?: string
    amount?: number
    percentage_of_balance?: number
  }
}

export const createTransferSchedule = post((payload: CreateOpnPaymentsTransferSchedulePayload) => ({
  path: `/schedules`,
  body: payload,
}))<OpnPaymentsTransferSchedule>
