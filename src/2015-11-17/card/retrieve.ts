import { get } from '../../fetch'
import type { OpnPaymentsCard, OpnPaymentsDeletedCard, OpnPaymentsCardList } from './schema'
import { createListQuery, type OpnPaymentsListQueryParam } from '../../list'

export const fetchCard = get((customerId: string, cardId: string) => ({
  path: `/customers/${customerId}/cards/${cardId}`,
}))<OpnPaymentsCard | OpnPaymentsDeletedCard>

export const fetchCardsForCustomer = get(
  (customerId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/customers/${customerId}`,
    query: createListQuery(param),
  }),
)<OpnPaymentsCardList>
