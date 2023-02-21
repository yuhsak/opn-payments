import type { OpnPaymentsRecipient, OpnPaymentsDeletedRecipient } from './schema'

export const isDeletedRecipient = (
  recipient: OpnPaymentsRecipient | OpnPaymentsDeletedRecipient,
): recipient is OpnPaymentsDeletedRecipient => 'deleted' in recipient && recipient.deleted

export const isRecipient = (
  recipient: OpnPaymentsRecipient | OpnPaymentsDeletedRecipient,
): recipient is OpnPaymentsRecipient => !isDeletedRecipient(recipient)
