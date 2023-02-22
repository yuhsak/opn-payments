import { config } from './__config'
import * as Token from '../src/2015-11-17/token'
import * as Customer from '../src/2015-11-17/customer'
import * as Card from '../src/2015-11-17/card'
import * as Charge from '../src/2015-11-17/charge'
import { throwWhenError } from '../src/error/fn'

const createTokenOnlyForTesting = throwWhenError(Token.createTokenOnlyForTesting)(config)

const fetchCustomer = throwWhenError(Customer.fetchCustomer)(config)
const createCustomer = throwWhenError(Customer.createCustomer)(config)
const updateCustomer = throwWhenError(Customer.updateCustomer)(config)

const deleteCard = throwWhenError(Card.deleteCard)(config)

const fetchCharge = throwWhenError(Charge.fetchCharge)(config)
const fetchCharges = throwWhenError(Charge.fetchCharges)(config)
const createCharge = throwWhenError(Charge.createCharge)(config)
const captureCharge = throwWhenError(Charge.captureCharge)(config)
const reverseCharge = throwWhenError(Charge.reverseCharge)(config)

const initToken = async () =>
  createTokenOnlyForTesting({
    name: 'TEST',
    number: '4242424242424242',
    expiration_month: 12,
    expiration_year: 2039,
    security_code: '999',
    country: 'jp',
  })

const initCustomerWithCard = async () => {
  const token = await initToken()
  const customer = await createCustomer({
    email: 'abc@example.com',
    card: token.id,
  })
  return { token, customer, card: customer.cards.data[0]! }
}

describe('Charge', () => {
  test('Create a charge for a token', async () => {
    // @ts-expect-error
    await expect(createCharge({})).rejects.toEqual(
      expect.objectContaining({
        code: 'invalid_amount',
      }),
    )

    // @ts-expect-error
    await expect(createCharge({ amount: 1000 })).rejects.toEqual(
      expect.objectContaining({
        code: 'invalid_charge',
      }),
    )

    // @ts-expect-error
    await expect(createCharge({ currency: 'jpy' })).rejects.toEqual(
      expect.objectContaining({
        code: 'invalid_amount',
      }),
    )

    await expect(createCharge({ amount: 1000, currency: 'jpy' })).rejects.toEqual(
      expect.objectContaining({
        code: 'not_found',
      }),
    )

    const token = await initToken()
    const charge = await createCharge({ amount: 1000, currency: 'jpy', card: token.id })
    expect(() => Charge.OpnPaymentsChargeSchema.parse(charge)).not.toThrowError()
    expect(Card.isCardFromToken(charge.card!)).toBe(true)
    expect(charge.customer).toBe(null)
    expect(charge.card?.id).toBe(token.card.id)

    expect(charge.capture).toBe(true)
    expect(charge.capturable).toBe(false)
    expect(charge.reversible).toBe(false)
    expect(charge.refundable).toBe(true)
    expect(charge.paid).toBe(true)
    expect(charge.reversed).toBe(false)
  })

  test('Create a charge for a customer, using default_card', async () => {
    const { customer, card } = await initCustomerWithCard()
    const charge = await createCharge({ amount: 1000, currency: 'jpy', customer: customer.id })
    expect(() => Charge.OpnPaymentsChargeSchema.parse(charge)).not.toThrowError()
    expect(Card.isCard(charge.card!)).toBe(true)
    expect(charge.customer).toBe(customer.id)
    expect(charge.card?.id).toBe(card.id)
  })

  test('Create a charge for a customer, using a specific card', async () => {
    const { customer, card, token: _token } = await initCustomerWithCard()
    const token = await initToken()
    const updatedCustomer = await updateCustomer(customer.id, { card: token.id })
    const newCard = updatedCustomer.cards.data[1]!
    const charge = await createCharge({
      amount: 1000,
      currency: 'jpy',
      customer: customer.id,
      card: newCard.id,
    })
    expect(() => Charge.OpnPaymentsChargeSchema.parse(charge)).not.toThrowError()
    expect(Card.isCard(charge.card!)).toBe(true)
    expect(charge.customer).toBe(customer.id)
    expect(charge.card?.id).toBe(newCard.id)

    const fetchedCustomer = await fetchCustomer(customer.id)
    expect(fetchedCustomer.default_card).toBe(card.id)
  })

  test('Fetch charge after deleting card', async () => {
    const { customer, card, token } = await initCustomerWithCard()
    const charge = await createCharge({
      amount: 1000,
      currency: 'jpy',
      customer: customer.id,
      card: card.id,
    })
    const fetchedA = await fetchCharge(charge.id)
    expect(() => Charge.OpnPaymentsChargeSchema.parse(fetchedA)).not.toThrowError()
    const deletedCard = await deleteCard(customer.id, card.id)
    const fetchedB = await fetchCharge(charge.id)
    expect(() => Charge.OpnPaymentsChargeSchema.parse(fetchedB)).not.toThrowError()
    expect(Card.isDeletedCard(fetchedB.card!)).toBe(true)
  })

  test('Fetch charges', async () => {
    const { customer, card, token } = await initCustomerWithCard()
    const charge = await createCharge({
      amount: 1000,
      currency: 'jpy',
      customer: customer.id,
      card: card.id,
    })
    const charges = await fetchCharges()
    expect(() => Charge.OpnPaymentsChargeListSchema.parse(charges)).not.toThrowError()
  })

  test('Fetch charge', async () => {
    const { customer } = await initCustomerWithCard()
    const charge = await createCharge({ amount: 1000, currency: 'jpy', customer: customer.id })
    const fetchedCharge = await fetchCharge(charge.id)
    expect(() => Charge.OpnPaymentsChargeSchema.parse(fetchedCharge)).not.toThrowError()
  })

  test('Capture a charge', async () => {
    const { customer } = await initCustomerWithCard()
    const charge = await createCharge({
      amount: 1000,
      currency: 'jpy',
      customer: customer.id,
      capture: false,
    })
    expect(charge.capture).toBe(false)
    expect(charge.capturable).toBe(true)
    expect(charge.reversible).toBe(true)
    expect(charge.refundable).toBe(false)
    expect(charge.paid).toBe(false)
    expect(charge.reversed).toBe(false)

    const capturedCharge = await captureCharge(charge.id)
    expect(() => Charge.OpnPaymentsChargeSchema.parse(capturedCharge)).not.toThrowError()
    expect(capturedCharge.capturable).toBe(false)
    expect(capturedCharge.reversible).toBe(false)
    expect(capturedCharge.reversed).toBe(false)
    expect(capturedCharge.refundable).toBe(true)
    expect(capturedCharge.paid).toBe(true)
  })

  test('Reverse a charge', async () => {
    const { customer } = await initCustomerWithCard()
    const charge = await createCharge({
      amount: 1000,
      currency: 'jpy',
      customer: customer.id,
      capture: false,
    })

    const reversedCharge = await reverseCharge(charge.id)
    expect(() => Charge.OpnPaymentsChargeSchema.parse(reversedCharge)).not.toThrowError()
    expect(reversedCharge.capturable).toBe(false)
    expect(reversedCharge.reversible).toBe(false)
    expect(reversedCharge.reversed).toBe(true)
    expect(reversedCharge.refundable).toBe(false)
    expect(reversedCharge.paid).toBe(false)
  })
})
