import { get } from '../../fetch'
import {
  createListQuery,
  fetchAll,
  type OpnPaymentsList,
  type OpnPaymentsListQueryParam,
} from '../../list'
import type { OpnPaymentsTransaction, OpnPaymentsTransactionSchema } from './schema'

export const fetchTransaction = get((transactionId: string) => ({
  path: `/transactions/${transactionId}`,
}))<OpnPaymentsTransaction>

export const fetchTransactions = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/transactions`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsTransactionSchema>>

export const fetchAllTransactions = fetchAll(fetchTransactions)
