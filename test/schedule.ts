import { config } from './__config'
import * as Token from '../src/2015-11-17/token'
import * as Customer from '../src/2015-11-17/customer'
import * as Schedule from '../src/2015-11-17/schedule'
import { throwWhenError } from '../src/error/fn'

const createTokenOnlyForTesting = throwWhenError(Token.createTokenOnlyForTesting)(config)
const createCustomer = throwWhenError(Customer.createCustomer)(config)

const createChargeSchedule = throwWhenError(Schedule.createChargeSchedule)(config)
const createTransferSchedule = throwWhenError(Schedule.createTransferSchedule)(config)
const deleteSchedule = throwWhenError(Schedule.deleteSchedule)(config)
const fetchSchedule = throwWhenError(Schedule.fetchSchedule)(config)
const fetchSchedules = throwWhenError(Schedule.fetchSchedules)(config)
const fetchChargeSchedules = throwWhenError(Schedule.fetchChargeSchedules)(config)
const fetchTransferSchedules = throwWhenError(Schedule.fetchTransferSchedules)(config)
const fetchChargeSchedulesForCustomer = throwWhenError(Schedule.fetchChargeSchedulesForCustomer)(
  config,
)
const fetchTransferSchedulesForRecipient = throwWhenError(
  Schedule.fetchTransferSchedulesForRecipient,
)(config)

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

describe('Schedule', () => {
  test('Fetch schedules', async () => {
    const schedules = await fetchSchedules()
    expect(() => Schedule.OpnPaymentsScheduleListSchema.parse(schedules)).not.toThrowError()
  })

  test('Fetch schedule', async () => {
    const { customer } = await initCustomerWithCard()
    const schedule = await createChargeSchedule({
      end_date: '2099-12-31',
      every: 1,
      period: 'day',
      charge: {
        customer: customer.id,
        amount: 1000,
      },
    })
    const fetched = await fetchSchedule(schedule.id)
    expect(() => Schedule.OpnPaymentsScheduleSchema.parse(fetched)).not.toThrowError()
  })

  test('Delete schedule', async () => {
    const { customer } = await initCustomerWithCard()
    const schedule = await createChargeSchedule({
      end_date: '2099-12-31',
      every: 1,
      period: 'day',
      charge: {
        customer: customer.id,
        amount: 1000,
      },
    })
    const deleted = await deleteSchedule(schedule.id)
    expect(() => Schedule.OpnPaymentsChargeScheduleSchema.parse(deleted)).not.toThrowError()
    expect(deleted.deleted).toBe(true)
    const fetched = await fetchSchedule(schedule.id)
    expect(() => Schedule.OpnPaymentsChargeScheduleSchema.parse(fetched)).not.toThrowError()
  })
})

describe('Charge Schedule', () => {
  test('Create a monthly charge schedule for a customer', async () => {
    const { customer } = await initCustomerWithCard()

    // period = monthの時、on = { days_of_month: number[] } | { weekday_of_month: string }がないとエラー
    await expect(
      // @ts-expect-error
      createChargeSchedule({
        charge: { amount: 1000, customer: customer.id },
        every: 1,
        period: 'month',
        end_date: '2099-12-31',
      }),
    ).rejects.toEqual(
      expect.objectContaining({
        code: 'bad_request',
      }),
    )

    const monthlyA = await createChargeSchedule({
      charge: { amount: 1000, customer: customer.id },
      every: 1,
      period: 'month',
      on: {
        days_of_month: [1],
      },
      end_date: '2099-12-31',
    })
    expect(() => Schedule.OpnPaymentsChargeScheduleSchema.parse(monthlyA)).not.toThrowError()

    const monthlyB = await createChargeSchedule({
      charge: { amount: 1000, customer: customer.id },
      every: 1,
      period: 'month',
      on: {
        weekday_of_month: '1st_tuesday',
      },
      end_date: '2099-12-31',
    })
    expect(() => Schedule.OpnPaymentsChargeScheduleSchema.parse(monthlyB)).not.toThrowError()
  })

  test('Create a weekly charge schedule for a customer', async () => {
    const { customer } = await initCustomerWithCard()

    // period = weekの時、on = { weekdays: string[] }がないとエラー
    await expect(
      // @ts-expect-error
      createChargeSchedule({
        charge: { amount: 1000, customer: customer.id },
        every: 1,
        period: 'week',
        end_date: '2099-12-31',
      }),
    ).rejects.toEqual(
      expect.objectContaining({
        code: 'bad_request',
      }),
    )

    const weekly = await createChargeSchedule({
      charge: { amount: 1000, customer: customer.id },
      every: 1,
      period: 'week',
      on: {
        weekdays: ['monday', 'tuesday'],
      },
      end_date: '2099-12-31',
    })
    expect(() => Schedule.OpnPaymentsChargeScheduleSchema.parse(weekly)).not.toThrowError()
  })

  test('Create a daily charge schedule for a customer', async () => {
    const { customer } = await initCustomerWithCard()

    const daily = await createChargeSchedule({
      charge: { amount: 1000, customer: customer.id },
      every: 1,
      period: 'day',
      end_date: '2099-12-31',
    })
    expect(() => Schedule.OpnPaymentsChargeScheduleSchema.parse(daily)).not.toThrowError()
  })

  test('Fetch charge schedules', async () => {
    const schedules = await fetchChargeSchedules()
    expect(() => Schedule.OpnPaymentsChargeScheduleListSchema.parse(schedules)).not.toThrowError()
  })

  test('Fetch charge schedules for a customer', async () => {
    const { customer } = await initCustomerWithCard()
    const daily = await createChargeSchedule({
      charge: { amount: 1000, customer: customer.id },
      every: 1,
      period: 'day',
      end_date: '2099-12-31',
    })
    const schedules = await fetchChargeSchedulesForCustomer(customer.id)
    expect(() => Schedule.OpnPaymentsChargeScheduleListSchema.parse(schedules)).not.toThrowError()
  })
})
