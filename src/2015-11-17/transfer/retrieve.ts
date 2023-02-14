import { get } from '../../fetch'
import type { OpnPaymentsTransfer, OpnPaymentsTransferSchema } from './schema'
import {
  createListQuery,
  fetchAll,
  type OpnPaymentsList,
  type OpnPaymentsListQueryParam,
} from '../../list'

export const fetchTransfer = get((transferId: string) => ({
  path: `/transfers/${transferId}`,
}))<OpnPaymentsTransfer>

export const fetchTransfers = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/transfers`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsTransferSchema>>

export const fetchAllTransfers = fetchAll(fetchTransfers)
