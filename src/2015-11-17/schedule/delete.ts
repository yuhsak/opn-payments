import { del } from '../../fetch'
import type { OpnPaymentsSchedule } from './schema'

export const deleteSchedule = del((scheduleId: string) => ({
  path: `/schedules/${scheduleId}`,
}))<OpnPaymentsSchedule>
