import { z } from "zod"


export type LoansProps = {
    startDate: Date
    endDate: Date
    totalAmount: string
    interestRate?: number
    greatTotalAmount?: number
    remainingBalance?: number
    moneyNotReceived?: number
    renewal?: boolean

}

export const LoansSchema = z.object({
    startDate: z.date().refine((data) => data !== undefined,{message:"Ingresa una fecah valida"}).optional(),
    endDate: z.date().refine((data) => data !== undefined,{message:"Ingresa una fecah valida"}).optional(),
    totalAmount: z.string().refine((amount) => parseFloat(amount) > 0,{message:"el monto debe ser mayor a 0 pesos"}).optional(),
    renewal: z.boolean().optional()
})