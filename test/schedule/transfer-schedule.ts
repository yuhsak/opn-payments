import { config } from '../__config'
import * as Schedule from '../../src/2015-11-17/schedule'
import { throwWhenError } from '../../src/error/fn'
import { initRecipient } from '../__util'

const createTransferSchedule = throwWhenError(Schedule.createTransferSchedule)(config)
const fetchTransferSchedules = throwWhenError(Schedule.fetchTransferSchedules)(config)
const fetchTransferSchedulesForRecipient = throwWhenError(
  Schedule.fetchTransferSchedulesForRecipient,
)(config)

describe('Transfer Schedule', () => {
  test('Create transfer schedule', async () => {
    const recipient = await initRecipient()
    const schedule = await createTransferSchedule({
      end_date: '2099-12-31',
      every: 1,
      period: 'day',
      transfer: {
        recipient: recipient.id,
        amount: 1000,
      },
    })
    expect(() => Schedule.OpnPaymentsTransferScheduleSchema.parse(schedule)).not.toThrowError()
  })

  test('Fetch transfer schedules', async () => {
    const schedules = await fetchTransferSchedules()
    expect(() => Schedule.OpnPaymentsTransferScheduleListSchema.parse(schedules)).not.toThrowError()
  })

  test('Fetch transfer schedules for recipient', async () => {
    const recipient = await initRecipient()
    const schedule = await createTransferSchedule({
      end_date: '2099-12-31',
      every: 1,
      period: 'day',
      transfer: {
        recipient: recipient.id,
        amount: 1000,
      },
    })
    const schedules = await fetchTransferSchedulesForRecipient(recipient.id)
    expect(() => Schedule.OpnPaymentsTransferScheduleListSchema.parse(schedules)).not.toThrowError()
  })
})
