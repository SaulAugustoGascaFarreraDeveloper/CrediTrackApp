"use client"
import { onGetClientData, onUpdateClientData } from '@/actions/clients'
import FormGenerator from '@/components/shared/form-generator'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useClient, useEditClient } from '@/hooks/clients/use-clients'
import { EditClientSchema } from '@/schemas/clients.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@prisma/client'
import { Edit, Loader } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


interface EditClientPageProps{
    params:{
        id: string
    }
}

const EditClientPage = ({params} : EditClientPageProps) => {


  //const {errors,loading,register,onUpdateClient,reset} = useEditClient(params.id)


  const form = useForm<z.infer<typeof EditClientSchema>>({
    resolver: zodResolver(EditClientSchema)
  })

  const [isClient,setIsClient] = useState<Client | undefined>(undefined)
  const [loading,setLoading] = useState<boolean>(false)

  const router = useRouter()


  const handleGetClientData = async () => {
    
    const res = await onGetClientData(params.id)

    console.log(res?.client)

    setIsClient(res?.client as Client | undefined) 

  }


  const handleUpdateClient = async () => {
    
    

    try{

      setLoading(true)

      const r = await onUpdateClientData(params.id,form.getValues().name,form.getValues().lastName,form.getValues().phone)


      console.log(r)

    }catch(error)
    {
      console.log(error)

    }finally{
      setLoading(false)
    }


    
    
  }


  useEffect(() => {
    handleGetClientData()
    
  },[params.id])


  return (
    <div className='flex flex-col items-center justify-center p-16 gap-4'>
      <h1>Edita la información sobre tu Cliente</h1>

      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleUpdateClient)} className='flex flex-col gap-2 ' >
          <FormField 

            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem>
                  <FormControl>
                    <Input defaultValue={isClient?.name} value={field.value} onChange={field.onChange} />
                  </FormControl>
              </FormItem>
            )}
          
          />
          <FormField 

            control={form.control}
            name='lastName'
            render={({field}) => (
              <FormItem>
                  <FormControl>
                    <Input defaultValue={isClient?.lastName} value={field.value} onChange={field.onChange} />
                  </FormControl>
              </FormItem>
            )}

            />

            <FormField 

            control={form.control}
            name='phone'
            render={({field}) => (
              <FormItem>
                  <FormControl>
                    <Input defaultValue={isClient?.phone} value={field.value} onChange={field.onChange} />
                  </FormControl>
              </FormItem>
            )}

            />
          <Button type='submit' >
              {loading ? <Loader className='animate-spin' /> : "Actualizar"}
          </Button>
        </form>
      </Form>

    
       
    </div>
  )
}

export default EditClientPage