import { get } from '../../fetch'
import type { OpnPaymentsOccurrence, OpnPaymentsOccurrenceList } from './schema'
import { createListQuery, type OpnPaymentsListQueryParam } from '../../list'

export const fetchOccurrencesForSchedule = get(
  (scheduleId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/schedules/${scheduleId}/occurrences`,
    query: createListQuery(param),
  }),
)<OpnPaymentsOccurrenceList>

export const fetchOccurrence = get((occurrenceId: string) => ({
  path: `/occurrences/${occurrenceId}`,
}))<OpnPaymentsOccurrence>
