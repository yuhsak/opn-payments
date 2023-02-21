import type {
  OpnPaymentsChargeSchedule,
  OpnPaymentsSchedule,
  OpnPaymentsTransferSchedule,
} from './schema'

export const isChargeSchedule = (
  schedule: OpnPaymentsSchedule,
): schedule is OpnPaymentsChargeSchedule => 'charge' in schedule

export const isTransferSchedule = (
  schedule: OpnPaymentsSchedule,
): schedule is OpnPaymentsTransferSchedule => 'transfer' in schedule
