import { get } from '../../fetch'
import type { OpnPaymentsRecipient, OpnPaymentsRecipientSchema } from './schema'
import {
  createListQuery,
  fetchAll,
  type OpnPaymentsList,
  OpnPaymentsListQueryParam,
} from '../../list'

export const fetchRecipient = get((recipientId: string) => ({
  path: `/recipients/${recipientId}`,
}))<OpnPaymentsRecipient>

export const fetchRecipients = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/recipients`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsRecipientSchema>>

export const fetchAllRecipients = fetchAll(fetchRecipients)
