import { config } from './__config'
import * as Token from '../src/2015-11-17/token'
import * as Customer from '../src/2015-11-17/customer'
import * as Card from '../src/2015-11-17/card'
import { throwWhenError } from '../src/error/fn'
import { initCustomerWithCard, initToken } from './__util'

const fetchTokenOnlyForTesting = throwWhenError(Token.fetchTokenOnlyForTesting)(config)

const fetchCustomer = throwWhenError(Customer.fetchCustomer)(config)
const fetchCustomers = throwWhenError(Customer.fetchCustomers)(config)
const updateCustomer = throwWhenError(Customer.updateCustomer)(config)
const deleteCustomer = throwWhenError(Customer.deleteCustomer)(config)

const fetchCard = throwWhenError(Card.fetchCard)(config)
const fetchCardsForCustomer = throwWhenError(Card.fetchCardsForCustomer)(config)
const updateCard = throwWhenError(Card.updateCard)(config)
const deleteCard = throwWhenError(Card.deleteCard)(config)

describe('Customer, Card', () => {
  test('Create a customer with a card', async () => {
    const { token, customer, card } = await initCustomerWithCard()
    const fetchedToken = await fetchTokenOnlyForTesting(token.id)

    expect(() => Token.OpnPaymentsTokenSchema.parse(fetchedToken)).not.toThrowError()
    expect(() => Token.OpnPaymentsTokenSchema.parse(token)).not.toThrowError()
    expect(() => Customer.OpnPaymentsCustomerSchema.parse(customer)).not.toThrowError()

    const cards = await fetchCardsForCustomer(customer.id)
    expect(() => Card.OpnPaymentsCardListSchema.parse(cards)).not.toThrowError()

    // 最初のカードがデフォルトになる
    const defaultCardId = customer.default_card
    expect(defaultCardId).toBe(card.id)
  })

  test('Delete a customer', async () => {
    const { customer, card } = await initCustomerWithCard()

    const deletedCustomer = await deleteCustomer(customer.id)
    expect(() =>
      Customer.OpnPaymentsDeletedCustomerSchema.parse(deletedCustomer),
    ).not.toThrowError()
    expect(Customer.isDeletedCustomer(deletedCustomer)).toBe(true)

    // 削除済みのCustomerを取得しようとするとエラー
    await expect(fetchCustomer(customer.id)).rejects.toEqual(
      expect.objectContaining({
        code: 'not_found',
      }),
    )

    // 削除済みのCustomerに紐付くカードを取得しようとするとエラー
    await expect(fetchCardsForCustomer(deletedCustomer.id)).rejects.toEqual(
      expect.objectContaining({ code: 'not_found' }),
    )

    // 削除済みのCustomerに紐付くカードを取得しようとするとエラー
    await expect(fetchCard(deletedCustomer.id, card.id)).rejects.toEqual(
      expect.objectContaining({
        code: 'not_found',
      }),
    )

    // 削除済みのものは含まない
    const customers = await fetchCustomers({ order: 'reverse_chronological' })
    expect(() => Customer.OpnPaymentsCustomerListSchema.parse(customers)).not.toThrowError()
  })

  test('Delete a card for a customer', async () => {
    const { customer, card } = await initCustomerWithCard()
    const defaultCardId = customer.default_card
    expect(defaultCardId).toBe(card.id)

    const deletedCard = await deleteCard(customer.id, card.id)
    expect(() => Card.OpnPaymentsDeletedCardSchema.parse(deletedCard)).not.toThrowError()
    expect(Card.isDeletedCard(deletedCard)).toBe(true)

    // 削除済みのCardを取得しようとするとエラー
    await expect(fetchCard(customer.id, deletedCard.id)).rejects.toEqual(
      expect.objectContaining({
        code: 'not_found',
      }),
    )

    // Customerのcardsから消え、デフォルトも解除
    const customerB = await fetchCustomer(customer.id)
    expect(customerB.cards.data.length).toBe(0)
    expect(customerB.default_card).toBe(null)

    // Customerのcardsから消える
    const cards = await fetchCardsForCustomer(customer.id)
    expect(cards.data.length).toBe(0)
  })

  test('Add a new card for a customer', async () => {
    const { customer, card } = await initCustomerWithCard()
    const defaultCardId = customer.default_card
    expect(defaultCardId).toBe(card.id)

    // カードを追加してもデフォルトはそのまま
    const token = await initToken()
    const updatedCustomer = await updateCustomer(customer.id, {
      card: token.id,
    })
    expect(() => Customer.OpnPaymentsCustomerSchema.parse(updatedCustomer)).not.toThrowError()
    expect(updatedCustomer.cards.data.length).toBe(2)
    expect(updatedCustomer.default_card).toBe(card.id)

    // デフォルトのカードが消されると他のカードがデフォルトになる
    const newCard = updatedCustomer.cards.data[1]!
    const deletedCard = await deleteCard(customer.id, card.id)
    const customerB = await fetchCustomer(customer.id)
    expect(customerB.default_card).toBe(newCard.id)
  })

  test('Update a card', async () => {
    const { customer, card } = await initCustomerWithCard()
    const updatedCard = await updateCard(customer.id, card.id, { name: 'John' })
    expect(() => Card.OpnPaymentsCardSchema.parse(updatedCard)).not.toThrowError()
  })
})
