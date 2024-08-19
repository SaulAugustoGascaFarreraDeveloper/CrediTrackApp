"use client"

import { ClientProps, ClientSchema, EditClientSchema } from "@/schemas/clients.schema"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { onCreateClient, onUpdateClientData } from "@/actions/clients"
import { useRouter } from "next/navigation"

export const useClient =  (id?: string) => {

    const {register,reset,formState: {errors},handleSubmit} = useForm<ClientProps>({
        resolver: zodResolver(ClientSchema)
    })


    const {toast} = useToast()


    const router = useRouter()


    const [loading,setLoading] = useState<boolean>(false)
    //const [isClients,setIsClients] = useState<{name: string,lastName: String,phone: string}[] | undefined>([])


    const onSubmitClient = handleSubmit(async (value) => {

        setLoading(true)


        const client = await onCreateClient(value.name,value.lastName,value.phone)

        

        if(client)
        {

            //setIsClients(client.)

            toast({
                title: "Exitoso",
                description: client.message,
                
            })

            setLoading(false)

            reset()

            router.refresh()
        }

    })


    


    return {register,errors,onSubmitClient,loading}


}



export const useEditClient = (id?: string) => {

    const {register,reset,formState: {errors},handleSubmit} = useForm<ClientProps>({
        resolver: zodResolver(EditClientSchema)
    })

    const {toast} = useToast()


    const [loading,setLoading] = useState<boolean>(false)

    const onUpdateClient = handleSubmit(async (value) => {

        setLoading(true)

        const client = await onUpdateClientData(id as string,value.name,value.lastName,value.phone)

        if(client)
        {


            toast({
                title: "Exitoso",
                description:client.message
            })

            setLoading(false)

            reset()
        }

    })

    return {register,errors,onUpdateClient,loading,reset}

}