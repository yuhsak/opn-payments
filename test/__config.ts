import { combine, required, str } from 'envvv'
import { createConfig } from '../src/config'

const { OPN_PAYMENTS_SECRET_KEY_FOR_TEST, OPN_PAYMENTS_PUBLIC_KEY_FOR_TEST } = combine([
  required(str('OPN_PAYMENTS_SECRET_KEY_FOR_TEST')()),
  required(str('OPN_PAYMENTS_PUBLIC_KEY_FOR_TEST')()),
])(process.env)

export const config = createConfig({
  apiVersion: '2015-11-17',
  secretKey: OPN_PAYMENTS_SECRET_KEY_FOR_TEST,
  onlyForTesting: {
    publicKey: OPN_PAYMENTS_PUBLIC_KEY_FOR_TEST,
  },
})
