import { config } from '../__config'
import * as Schedule from '../../src/2015-11-17/schedule'
import { throwWhenError } from '../../src/error/fn'
import { initCustomerWithCard, initRecipient } from '../__util'

const createChargeSchedule = throwWhenError(Schedule.createChargeSchedule)(config)
const deleteSchedule = throwWhenError(Schedule.deleteSchedule)(config)
const fetchSchedule = throwWhenError(Schedule.fetchSchedule)(config)
const fetchSchedules = throwWhenError(Schedule.fetchSchedules)(config)

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
