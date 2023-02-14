import { z } from 'zod'

export const OpnPaymentsScheduleIdSchema = z.string().regex(/^schd_/)

export const OpnPaymentsScheduledChargeIdSchema = z.string().regex(/^rchg_/)

export const OpnPaymentsScheduledTransferIdSchema = z.string().regex(/^rtrf_/)
