import type { OpnPaymentsDeletedLink, OpnPaymentsLink } from './schema'

export const isDeletedLink = (
  link: OpnPaymentsLink | OpnPaymentsDeletedLink,
): link is OpnPaymentsDeletedLink => !('location' in link) && link.deleted
