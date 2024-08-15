"use client"
import { onGetOneLoanData, onUpdateLoanData } from '@/actions/loans'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { LoansSchema } from '@/schemas/loans.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loan } from '@prisma/client'
import { error } from 'console'
import { format } from 'date-fns'
import { CalendarIcon, Loader2Icon } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { number, z } from 'zod'

type EditLoanProps = {
    params:{
        id: string
    }
}


const EditLoan = ({params} : EditLoanProps) => {


    
  const [loan,setLoan] = useState<Loan | undefined>(undefined)
  const [date,setDate] = useState<Date>()
  const [amount,setAmount] = useState<number>(0)
  const [loading,setLoading] = useState<boolean>(false)

  const {toast} = useToast()

  const router = useRouter()

  
  const handleGetCurrentLoan = async() => {

    const response = await onGetOneLoanData(params.id)


    setLoan(response?.loan as Loan)

    setDate(response?.loan?.startDate as Date)


  }



  const handleUpdateLoanData = async () => {

    setLoading(true)

    try{
      
      const response = await onUpdateLoanData(params.id,form.getValues().totalAmount,date)

      toast({
        title: 'Éxito',
        description: response?.message
      })

      router.push('/loans')

    }catch(error){
      console.log(error)
    }
      finally{
      setLoading(false)
    }



  }






  useEffect(() =>{

    handleGetCurrentLoan()

  },[params.id])


  const form = useForm<z.infer<typeof LoansSchema>>({
    resolver: zodResolver(LoansSchema),
    //mode: "onChange",
    // defaultValues:{
    //     startDate: date,
    //     endDate: new Date(),
    //     renewal: false,
    //     totalAmount: ''
    // }
  })
  

  return (
    <div className='flex flex-col gap-4 w-full p-16 items-center justify-center '>
      <h1 className='font-semibold'>Edita la información sobre tu Préstamo</h1>
      <Form {...form} >
      <form onSubmit={form.handleSubmit(handleUpdateLoanData,(errors) => console.log(errors))} className='flex flex-col gap-3'>
          <FormField 
            control={form.control}
            name='startDate'
            render={({field}) => (
              <FormItem>
                  <FormControl>
                  <Popover>
                                    <PopoverTrigger  asChild>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal ",
                                            !date && "text-muted-foreground"
                                        )}
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span className='ml-1'>Elige un fecha</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                      
                                        />
                                        
                                    </PopoverContent>
                                </Popover>
                  </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='totalAmount'
            render={({field}) => (
              <FormItem>
                  <FormControl>
                  <Input type='number'  defaultValue={loan?.totalAmount}  value={field.value} onChange={field.onChange}  />
                 
                  </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit' disabled={loading}  >
              {loading ? <Loader2Icon className='animate-spin' /> : "ACTUALIZAR"}
          </Button>
      </form>
    </Form>        

    </div>
    
           
  )
}

export default EditLoan