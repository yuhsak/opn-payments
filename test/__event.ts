import { config } from './__config'
import * as Event from '../src/2015-11-17/event'
import { throwWhenError } from '../src/error/fn'

const fetchEvents = throwWhenError(Event.fetchEvents)(config)
const fetchAllEvents = Event.fetchAllEvents(config)

// jest.setTimeout(5 * 60 * 1000)

// describe('Event', () => {
//   test('Fetch events', async () => {
//     const events = await fetchEvents()
//     expect(() => Event.OpnPaymentsEventListSchema.parse(events)).not.toThrowError()
//   })

//   test('Fetch all events', async () => {
//     const events = await fetchAllEvents()
//     for (const event of events) {
//       if (event.key === 'card.destroy') {
//         expect(() => Event.OpnPaymentsDeletedCardEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('card')) {
//         expect(() => Event.OpnPaymentsCardEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key === 'customer.destroy') {
//         expect(() => Event.OpnPaymentsDeletedCustomerEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('customer')) {
//         expect(() => Event.OpnPaymentsCustomerEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('charge')) {
//         expect(() => Event.OpnPaymentsChargeEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('dispute')) {
//         expect(() => Event.OpnPaymentsDisputeEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('recipient')) {
//         expect(() => Event.OpnPaymentsRecipientEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('refund')) {
//         expect(() => Event.OpnPaymentsRefundEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('transfer')) {
//         expect(() => Event.OpnPaymentsTransferEventSchema.parse(event)).not.toThrowError()
//       } else if (event.key.startsWith('schedule')) {
//         expect(() => Event.OpnPaymentsScheduleEventSchema.parse(event)).not.toThrowError()
//       }
//     }
//   })
// })
