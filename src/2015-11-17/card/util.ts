import { OpnPaymentsCard, OpnPaymentsDeletedCard } from './schema'

export const isDeletedCard = (
  card: OpnPaymentsCard | OpnPaymentsDeletedCard,
): card is OpnPaymentsDeletedCard => !('location' in card) && card.deleted
