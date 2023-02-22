import { config } from '../__config'
import * as Schedule from '../../src/2015-11-17/schedule'
import { throwWhenError } from '../../src/error/fn'
import { initCustomerWithCard, initRecipient } from '../__util'

const createChargeSchedule = throwWhenError(Schedule.createChargeSchedule)(config)
const fetchChargeSchedules = throwWhenError(Schedule.fetchChargeSchedules)(config)
const fetchChargeSchedulesForCustomer = throwWhenError(Schedule.fetchChargeSchedulesForCustomer)(
  config,
)

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
        days_of_month: [23],
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
