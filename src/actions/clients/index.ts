"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { Client } from "@prisma/client"
import { use } from "react"

export const  onCreateClient = async (name: string,lastName: string,phone: string) => {


    const user = await currentUser()

    if(!user) return null


    try{

      

        console.log(user.id)

        
        

        const validUser = await db.user.findUnique({
            where:{
                clerkId: user.id
            },
            select:{
                id: true
            }
        })


        

       

        if(validUser){
            const client = await db.client.create({
                data:{
                    name: name,
                    lastName: lastName,
                    phone: phone,
                    userId: validUser.id
                }
            })
    
            
    
            if(client){
                return {status: 200,message: "Cliente creado exitosamente",client: client}
            }
        }
         

       

        return {status: 400,message: "Error al crear cliente"}


    }catch(error){
        console.log("Create Client Error --> ",error)
    }

}


export const onGetAllClients = async (clerkId: string) => {

    try{

        const user = await currentUser()

        if(!user) return null

        const clients = await db.client.findMany({
            //take: 17,
            skip: (1 - 1) * 17,
            select:{
                name: true,
                phone: true,
                lastName: true,
                id: true
            }
        })


        if(clients){
            return {status: 200,message: "Clientes obtenidos con exito",clients: clients}
        }

        return {status: 400,message: "Hubo un error al obtener a los clientes"}

    }catch(error){
        console.log("Get All Clients Error --> ",error)
    }

}



export const onGetTotalClient = async () => {

    try{


        const clients = await db.client.count({
            where:{
                userId: 'd3213d91-002f-432c-99c5-45dd1f02eab8'
            },
            
        })

        console.log(clients)


        return clients

    }catch(error){
        console.log("On Get Total Clients Error --> ",error)
    }

}


export const onGetClientData = async (id: string) => {

    try{
        const client = await db.client.findUnique({
            where:{
                id: id
            },
            select:{
                name: true,
                lastName: true,
                phone: true
            }
           
        })

        if(client){
            return {status: 200,message: "Informacion Obtenida del cliente exitoso",client: client}
        }

        return {status: 400,message: "Oops algo salio mal"}
    }catch(error)
    {
        console.log("On Get Client Data Error --> ",error)
    }

}


export const onUpdateClientData = async (id: string,name?: string,lastName?: string,phone?: string) => {


    try{


        const client = await db.client.update({
            where:{
                id: id
            },data:{
                name: name,
                lastName: lastName,
                phone: phone
            }
        })


        if(client){
            return {status: 200,message:"Client Actualiado Correctamente"}
        }

        return {status: 400,message:"Oops hubo un error"}

    }catch(error)
    {
        console.log("On Update Client Error --> ",error)
    }

}


export const onGetValidClient = async (id: string) => {

    const user = await currentUser()

    if(!user) return null

    try{

        const validClient = await db.client.findUnique({
            where:{
                id: id
            },
            select:{
                id: true
            }
        })

        return {...validClient}

    }catch(error){
        console.log("On Get Valid Client Error --> ",error)
    }

}