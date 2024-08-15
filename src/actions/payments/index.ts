"use server"

import { db } from "@/lib/db"
import { addDays } from "date-fns"

export const onCreatePayment = async (loanId:string,hasPay: boolean,paymentAmount?: string) => {

    try{

        const validLoan = await db.loan.findUnique({
            where:{
                id: loanId
            }
        })

        if(!validLoan) return null

        const paymentCount = await db.payment.count()

        if(paymentCount >= 2)
        {
            return {status: 500,message: "No se pueden agregar mas pagos"}
        }

        if(!hasPay){
            const updateLoanEndDate = await db.loan.update({
                where:{
                    id: loanId
                },
                data:{
                    endDate: addDays(validLoan.endDate,1)
                }
            })
        }

        if(hasPay && paymentAmount == undefined || paymentAmount == '0')
        {
            return {status: 400,message:"Se debe poner un monto mayor a 0 cuando el cliente ha pagado"}
        }

        

        const payment = await db.payment.create({
            data:{
                hasPay: hasPay,
                loanId: validLoan.id
            }
        })

        if(payment){
            return {status: 200,message:"Pago Realizado con exito"}
        }

        return {status: 400,message:"Oops hubo un error"}

    }catch(error)
    {
        console.log("On Create Payemt Error --> ",error)
    }

}