import { config } from './__config'
import * as Charge from '../src/2015-11-17/charge'
import * as Refund from '../src/2015-11-17/refund'
import { throwWhenError } from '../src/error/fn'
import { initCustomerAndCharge } from './__util'

const fetchCharge = throwWhenError(Charge.fetchCharge)(config)
const captureCharge = throwWhenError(Charge.captureCharge)(config)

const fetchRefund = throwWhenError(Refund.fetchRefund)(config)
const fetchRefundsForCharge = throwWhenError(Refund.fetchRefundsForCharge)(config)
const fetchRefunds = throwWhenError(Refund.fetchRefunds)(config)
const createRefund = throwWhenError(Refund.createRefund)(config)

describe('Refund', () => {
  test('Create a refund for a charge', async () => {
    const { charge: chargeA } = await initCustomerAndCharge(false)

    // captureしていないChargeは返金出来ない
    await expect(createRefund(chargeA.id, { amount: 1000 })).rejects.toEqual(
      expect.objectContaining({
        code: 'failed_refund',
      }),
    )

    await captureCharge(chargeA.id)
    const refundA = await createRefund(chargeA.id, { amount: 1000 })
    expect(() => Refund.OpnPaymentsRefundSchema.parse(refundA)).not.toThrowError()

    const { charge: chargeB } = await initCustomerAndCharge(false)

    // reverse済みのChargeは返金出来ない
    await expect(createRefund(chargeB.id, { amount: 1000 })).rejects.toEqual(
      expect.objectContaining({
        code: 'failed_refund',
      }),
    )

    const { charge: chargeC } = await initCustomerAndCharge()
    const refundC = await createRefund(chargeC.id, { amount: 500 })
    await expect(fetchCharge(chargeC.id)).resolves.toEqual(
      expect.objectContaining({
        refundable: true,
        refunded: 500,
      }),
    )

    // 残金を上回る額は返金出来ない
    await expect(createRefund(chargeC.id, { amount: 1000 })).rejects.toEqual(
      expect.objectContaining({
        code: 'failed_refund',
      }),
    )

    const refundD = await createRefund(chargeC.id, { amount: 500 })
    await expect(fetchCharge(chargeC.id)).resolves.toEqual(
      expect.objectContaining({
        refundable: false,
        refunded: 1000,
      }),
    )

    // 全額返金済みのChargeには返金出来ない
    await expect(createRefund(chargeC.id, { amount: 1000 })).rejects.toEqual(
      expect.objectContaining({
        code: 'failed_refund',
      }),
    )
  })

  test('Fetch refunds', async () => {
    const refunds = await fetchRefunds()
    expect(() => Refund.OpnPaymentsRefundListSchema.parse(refunds)).not.toThrowError()
  })

  test('Fetch refund', async () => {
    const { charge } = await initCustomerAndCharge()
    const refund = await createRefund(charge.id, { amount: 100 })
    const fetchedRefund = await fetchRefund(charge.id, refund.id)
    expect(() => Refund.OpnPaymentsRefundSchema.parse(fetchedRefund)).not.toThrowError()
  })

  test('Fetch refunds for charge', async () => {
    const { charge } = await initCustomerAndCharge()
    const refund = await createRefund(charge.id, { amount: 100 })
    const refunds = await fetchRefundsForCharge(charge.id)
    expect(() => Refund.OpnPaymentsRefundListSchema.parse(refunds)).not.toThrowError()
  })
})
