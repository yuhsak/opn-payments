import { get } from '../../fetch'
import { createListQuery, type OpnPaymentsListQueryParam, fetchAll } from '../../list'
import type { OpnPaymentsEvent, OpnPaymentsEventList } from './schema'

export const fetchEvent = get((eventId: string) => ({
  path: `/events/${eventId}`,
}))<OpnPaymentsEvent>

export const fetchEvents = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/events`,
  query: createListQuery(param),
}))<OpnPaymentsEventList>

export const fetchAllEvents = fetchAll(fetchEvents)
