"use server"

import { db } from "@/lib/db"
import { onGetValidClient } from "../clients"
import { addDays } from "date-fns"


export const onCreateLoan = async (clientId: string,startDate: Date,endDate: Date,totalAmount: string) => {

    try{

        const client = await onGetValidClient(clientId)

        if(!client) return null;


        const totalAmountFloat = parseFloat(totalAmount)
        const interestRateDecimnal = 20 /100
        const greatTotalAmount = totalAmountFloat * (1 + interestRateDecimnal)

        const loan = await db.loan.create({
            data:{
                clientId: client.id as string,
                startDate: startDate,
                endDate: endDate,
                totalAmount: totalAmountFloat,
                interestRate: interestRateDecimnal,
                greatTotalAmount: greatTotalAmount,
                remainingBalance: greatTotalAmount,
                renewal: false
            }
        })


        if(loan){
            return {status: 200,message: "Préstamo creado con exito",loan: loan}
        }

        return {status: 400,message: "Oops hubo un error"}

    }catch(error){
        console.log("On Create Loan Error --> ",error)
    }

}


export const onGetOneLoanData = async (id: string) => {

    try{

        const loan = await db.loan.findFirst({
            where:{
                id: id
            }
        })


        return {loan}

    }catch(error)
    {
        console.log(error)
    }


}


export const onUpdateLoanData = async(id: string,totalAmount?: string,startDate?: Date,endDate?: Date) => {

    try{

        if(!totalAmount && !startDate && !endDate){
            return {status: 200,message: "Ningun campo se modifico"}
        } 

        if(startDate)
        {
            endDate = addDays(startDate,12)
        }

        // Preparar los datos que serán actualizados
        const updateData: any = {};
        if (startDate) updateData.startDate = startDate;
        if (endDate) updateData.endDate = endDate;
        if (totalAmount) updateData.totalAmount = parseFloat(totalAmount);



        const loanUpdated = await db.loan.update({
            where:{
                id: id
            },
            data: updateData
            
        })


        if(loanUpdated)
        {
            return {status: 200,message: "Préstamo actualizado con exito"}
        }

        return {status: 400,message: "Oops hubo un error"}

    }catch(error){
        console.log("On Update Loan Data Error --> ",error)
    }

}


export const onGetAllLoans = async (clientId?: string) => {

    try{

        const loans = await db.loan.findMany({
            select:{
                client:{
                    select:{
                        name: true,
                        lastName: true
                    }
                },
                startDate: true,
                endDate: true,
                totalAmount: true,
                clientId: true,
                id: true,
                greatTotalAmount: true,
                interestRate: true,
                remainingBalance: true,
                renewal: true,
                moneyNotReceived: true,
                

            }
        })


        if(loans)
        {
            return {status: 200,message: "Préstamos obtenidos con exito",loans}
        }

        return {status: 400,message: "Oops hubo un error"}

    }catch(error)
    {
        console.log("On Get All Loans Error --> ",error)
    }

}


export const onDeleteLoan = async (id: string) => {


    try{

        const loan = await db.loan.delete({
            where:{
                id: id
            }
        })


        if(loan){
            return {status: 200,message: "Préstamo Eliminado Exitosamente"}
        }

        return {status: 400,message: "Oops hubo un error"}

    }catch(error)
    {
        console.log("On Delete Loan Error --> ",error)
    }

}

export const onGetTotalLoans = async () => {

    try{


        const loans = await db.loan.count()

        return loans

    }catch(error){
        console.log("On Get Total Loans Error --> ",error)
    }

}