import { get } from '../../fetch'
import type { OpnPaymentsCard, OpnPaymentsCardSchema } from './schema'
import { createListQuery, type OpnPaymentsListQueryParam, type OpnPaymentsList } from '../../list'

export const fetchCard = get((customerId: string, cardId: string) => ({
  path: `/customers/${customerId}/cards/${cardId}`,
}))<OpnPaymentsCard>

export const fetchCardsForCustomer = get(
  (customerId: string, param?: OpnPaymentsListQueryParam) => ({
    path: `/customers/${customerId}`,
    query: createListQuery(param),
  }),
)<OpnPaymentsList<typeof OpnPaymentsCardSchema>>
