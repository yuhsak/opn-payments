import type { OpnPaymentsRecipient, OpnPaymentsDeletedRecipient } from './schema'

export const isDeletedRecipient = (
  recipient: OpnPaymentsRecipient | OpnPaymentsDeletedRecipient,
): recipient is OpnPaymentsDeletedRecipient => !('location' in recipient) && recipient.deleted
