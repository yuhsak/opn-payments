import { get } from '../../fetch'
import { createListQuery, fetchAll, type OpnPaymentsListQueryParam } from '../../list'
import type { OpnPaymentsTransaction, OpnPaymentsTransactionList } from './schema'

export const fetchTransaction = get((transactionId: string) => ({
  path: `/transactions/${transactionId}`,
}))<OpnPaymentsTransaction>

export const fetchTransactions = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/transactions`,
  query: createListQuery(param),
}))<OpnPaymentsTransactionList>

export const fetchAllTransactions = fetchAll(fetchTransactions)
