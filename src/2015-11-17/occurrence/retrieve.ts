import { get } from '../../fetch'
import type { OpnPaymentsOccurrence, OpnPaymentsOccurrenceSchema } from './schema'
import { createListQuery, type OpnPaymentsListQueryParam, type OpnPaymentsList } from '../../list'

export const fetchOccurrencesForSchedule = get(
  (scheduleId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/schedules/${scheduleId}/occurrences`,
    query: createListQuery(param),
  }),
)<OpnPaymentsList<typeof OpnPaymentsOccurrenceSchema>>

export const fetchOccurrence = get((occurrenceId: string) => ({
  path: `/occurrences/${occurrenceId}`,
}))<OpnPaymentsOccurrence>
