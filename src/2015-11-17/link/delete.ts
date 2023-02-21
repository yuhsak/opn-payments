import { del } from '../../fetch'
import type { OpnPaymentsDeletedLink } from './schema'

export const deleteLink = del((linkId: string) => ({
  path: `/links/${linkId}`,
}))<OpnPaymentsDeletedLink>
