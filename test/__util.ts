import { config } from './__config'
import * as Token from '../src/2015-11-17/token'
import * as Customer from '../src/2015-11-17/customer'
import * as Charge from '../src/2015-11-17/charge'
import * as Recipient from '../src/2015-11-17/recipient'
import { throwWhenError } from '../src/error/fn'

const createTokenOnlyForTesting = throwWhenError(Token.createTokenOnlyForTesting)(config)
const createCustomer = throwWhenError(Customer.createCustomer)(config)
const createCharge = throwWhenError(Charge.createCharge)(config)
const createRecipient = throwWhenError(Recipient.createRecipient)(config)
const verifyRecipientOnlyForTesting = throwWhenError(Recipient.verifyRecipientOnlyForTesting)(
  config,
)

export const initToken = async () =>
  createTokenOnlyForTesting({
    name: 'TEST',
    number: '4242424242424242',
    expiration_month: 12,
    expiration_year: 2039,
    security_code: '999',
    country: 'jp',
  })

export const initCustomerWithCard = async () => {
  const token = await initToken()
  const customer = await createCustomer({
    email: 'abc@example.com',
    card: token.id,
  })
  return { token, customer, card: customer.cards.data[0]! }
}

export const initCustomerAndCharge = async (capture = true, amount = 1000) => {
  const token = await initToken()
  const customer = await createCustomer({
    email: 'abc@example.com',
    card: token.id,
  })
  const charge = await createCharge({
    amount,
    currency: 'jpy',
    customer: customer.id,
    capture,
  })
  return { token, customer, card: customer.cards.data[0]!, charge }
}

export const initRecipient = async (verified = true) => {
  const recipient = await createRecipient({
    type: 'individual',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bank_account: {
      name: 'John Doe',
      number: '0000001',
      account_type: 'normal',
      branch_code: '001',
      bank_code: '0001',
    },
  })
  if (verified) {
    return verifyRecipientOnlyForTesting(recipient.id)
  }
  return recipient
}
