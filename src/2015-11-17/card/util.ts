import { OpnPaymentsCard, OpnPaymentsDeletedCard, OpnPaymentsCardFromToken } from './schema'

export const isDeletedCard = (
  card: OpnPaymentsCard | OpnPaymentsDeletedCard | OpnPaymentsCardFromToken,
): card is OpnPaymentsDeletedCard => 'deleted' in card && card.deleted

export const isCardFromToken = (
  card: OpnPaymentsCard | OpnPaymentsDeletedCard | OpnPaymentsCardFromToken,
): card is OpnPaymentsCardFromToken =>
  !('location' in card) && (!('deleted' in card) || !card.deleted)

export const isCard = (
  card: OpnPaymentsCard | OpnPaymentsDeletedCard | OpnPaymentsCardFromToken,
): card is OpnPaymentsCard => !isDeletedCard(card) && !isCardFromToken(card)
