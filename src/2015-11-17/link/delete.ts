import { del } from '../../fetch'
import type { OpnPaymentsLink } from './schema'

export const deleteLink = del((linkId: string) => ({
  path: `/links/${linkId}`,
}))<OpnPaymentsLink>
