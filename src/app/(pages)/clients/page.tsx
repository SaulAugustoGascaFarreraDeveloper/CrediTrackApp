import { onCreateClient, onGetAllClients } from '@/actions/clients'
import { DrawerDemo } from '@/components/client/add-client-drawer'
import { DataTableDemo } from '@/components/client/client-data-table'
import RouteMenuButton from '@/components/shared/route-menu-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useClient } from '@/hooks/clients/use-clients'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { Client } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

const ClientsPage = async () => {


    // const [isClients,setIsClients] = useState<Client[] | undefined>([])

    // const router = useRouter()

    


    // const getClients = async () => {

    //     // const user = await currentUser()

    //     // if(!user) return

    //     const clients = await onGetAllClients()

    //     if(clients){
    //         setIsClients(clients.clients as []  | undefined)
    //     }

        
        
    // }

    // useEffect(() => {

    //     getClients()

    // },[isClients])

//    const user = await currentUser()

//    if(!user) redirect('/sign-in')

    const user = await currentUser()

    if(!user) return  redirect("/sign-in")

    const findUser = await db.user.findUnique({
        where:{
            clerkId: user.id
        }
    })

    if(!findUser) return null


    const isClients = await db.client.findMany({
        where:{
            userId: findUser.id
        },
        select:{
            name: true,
            phone: true,
            lastName: true,
            id: true
        }
    })

    if(isClients)
    {
        
    }

  return (

    <div className='flex flex-col gap-1 w-full h-screen px-6 overflow-y-auto'>

        <h2 className='font-semibold '>Tabla de Clientes</h2> 

        <div className="items-start mt-10">
            
            <DrawerDemo />
           
            
        </div>

        <DataTableDemo data={isClients as [] || []} />

        {/* <div>
        <RouteMenuButton />
        </div> */}
        
      

    </div>

   
  )
}

export default ClientsPage