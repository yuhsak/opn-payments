import { combine, required, str } from 'envvv'
import { createConfig } from '../src/config'

const { OPN_PAYMENTS_SECRET_KEY_FOR_TEST } = combine([
  required(str('OPN_PAYMENTS_SECRET_KEY_FOR_TEST')()),
])(process.env)

export const config = createConfig({
  secretKey: OPN_PAYMENTS_SECRET_KEY_FOR_TEST,
})
