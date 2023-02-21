import { get } from '../../fetch'
import type { OpnPaymentsLink, OpnPaymentsDeletedLink, OpnPaymentsLinkList } from './schema'
import { createListQuery, fetchAll, type OpnPaymentsListQueryParam } from '../../list'

export const fetchLink = get((linkId: string) => ({
  path: `/links/${linkId}`,
}))<OpnPaymentsLink | OpnPaymentsDeletedLink>

export const fetchLinks = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/links`,
  query: createListQuery(param),
}))<OpnPaymentsLinkList>

export const fetchAllLinks = fetchAll(fetchLinks)
