"use client"

import { onCreateLoan } from "@/actions/loans"
import { useToast } from "@/components/ui/use-toast"
import { LoansProps, LoansSchema } from "@/schemas/loans.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"




export const useLoans =  (id?: string) => {

    const {register,formState:{errors},reset,handleSubmit} = useForm<LoansProps>({
        resolver: zodResolver(LoansSchema),
        defaultValues:{
            startDate: new Date(),
            endDate: new Date(),
            renewal: false,
            totalAmount: ''
        }
    })

    const [loading,setLoading] = useState<boolean>(false)

    const {toast} = useToast()



    const onSubmitLoan = handleSubmit(async (value) => {


            setLoading(true)

            const loan = await onCreateLoan(id as string,value.startDate,value.endDate,value.totalAmount)


            if(loan)
            {
                setLoading(false)

                toast({
                    title: "Exito",
                    description: loan.message
                })

                reset()
            }

        
            

    })

    return {loading,register,errors,onSubmitLoan}

}