import { get } from '../../fetch'
import type {
  OpnPaymentsRecipient,
  OpnPaymentsDeletedRecipient,
  OpnPaymentsRecipientList,
} from './schema'
import { createListQuery, fetchAll, OpnPaymentsListQueryParam } from '../../list'

export const fetchRecipient = get((recipientId: string) => ({
  path: `/recipients/${recipientId}`,
}))<OpnPaymentsRecipient | OpnPaymentsDeletedRecipient>

export const fetchRecipients = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/recipients`,
  query: createListQuery(param),
}))<OpnPaymentsRecipientList>

export const fetchAllRecipients = fetchAll(fetchRecipients)
