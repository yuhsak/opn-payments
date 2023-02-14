import { get } from '../../fetch'
import type { OpnPaymentsLink, OpnPaymentsLinkSchema } from './schema'
import {
  createListQuery,
  fetchAll,
  type OpnPaymentsListQueryParam,
  type OpnPaymentsList,
} from '../../list'

export const fetchLink = get((linkId: string) => ({
  path: `/links/${linkId}`,
}))<OpnPaymentsLink>

export const fetchLinks = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/links`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsLinkSchema>>

export const fetchAllLinks = fetchAll(fetchLinks)
