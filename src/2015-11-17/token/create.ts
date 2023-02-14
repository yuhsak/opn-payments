import { post } from '../../fetch'
import type { OpnPaymentsToken } from './schema'

export type CreateOpnPaymentsTokenOnlyForTestingPayload = {
  expiration_month: number
  expiration_year: number
  name: string
  number: string
  security_code?: string
  country?: string
  postal_code?: string
  state?: string
  city?: string
  street1?: string
  street2?: string
  phone_number?: string
}

export const createTokenOnlyForTesting = post(
  (payload: CreateOpnPaymentsTokenOnlyForTestingPayload) => ({
    path: `/tokens`,
    body: { card: payload },
    vault: true,
  }),
)<OpnPaymentsToken>
