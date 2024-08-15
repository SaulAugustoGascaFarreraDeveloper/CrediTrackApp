"use client"
import { onCreateClient, onGetAllClients } from '@/actions/clients'
import { DrawerDemo } from '@/components/client/add-client-drawer'
import { DataTableDemo } from '@/components/client/client-data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useClient } from '@/hooks/clients/use-clients'
import { currentUser } from '@clerk/nextjs/server'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ClientsPage = () => {


    const [isClients,setIsClients] = useState<{name: string,phone: true}[] | undefined>([])



    const getClients = async () => {

        // const user = await currentUser()

        // if(!user) return

        const clients = await onGetAllClients("aacc83b2-1262-4a49-9fa6-b3fa0e54d2c5")

        if(clients){
            setIsClients(clients.clients as []  | undefined)
        }

        
        
    }

    useEffect(() => {

        getClients()

    },[isClients])

  return (

    <div className='flex flex-col gap-3 w-full h-screen px-6 overflow-y-auto'>

        <div className="items-start mt-10">
            
            <DrawerDemo />
           
            
        </div>

        <DataTableDemo data={isClients as [] || []} />

    </div>

   
  )
}

export default ClientsPage