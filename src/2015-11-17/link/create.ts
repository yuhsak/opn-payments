import { post } from '../../fetch'
import type { OpnPaymentsLink } from './schema'

export type CreateOpnPaymentsLinkPayload = {
  amount: number
  currency: string
  description: string
  title: string
  multiple?: boolean
}

export const createLink = post((payload: CreateOpnPaymentsLinkPayload) => ({
  path: `/links`,
  body: payload,
}))<OpnPaymentsLink>
