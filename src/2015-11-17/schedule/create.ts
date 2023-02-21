import { post } from '../../fetch'
import type {
  OpnPaymentsChargeSchedule,
  OpnPaymentsTransferSchedule,
  OpnPaymentsScheduleWeekday,
  OpnPaymentsScheduleWeekdayOfMonth,
} from './schema'

type CreateOpnPaymentsSchedulePayloadPeriodPattern =
  | {
      period: 'day'
    }
  | {
      period: 'week'
      on: {
        weekdays: OpnPaymentsScheduleWeekday[]
      }
    }
  | {
      period: 'month'
      on:
        | {
            days_of_month: number[]
          }
        | {
            weekday_of_month: OpnPaymentsScheduleWeekdayOfMonth
          }
    }

type CreateOpnPaymentsSchedulePayloadBase = {
  start_date?: string
  end_date: string
  every: number
} & CreateOpnPaymentsSchedulePayloadPeriodPattern

export type CreateOpnPaymentsChargeSchedulePayload = CreateOpnPaymentsSchedulePayloadBase & {
  charge: {
    customer: string
    amount: number
    card?: string
    currency?: string
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
