"use client"
import { onCreateLoan } from '@/actions/loans'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { LoansSchema } from '@/schemas/loans.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type CreateLoanPage = {
    params:{
        id: string
    }
}


const CreateLoanPage = ({params} : CreateLoanPage) => {


  const [date,setDate] = useState<Date>()
  const [finalDateCalculated,setFinalDateCalculated] = useState<Date>()


  const [isLoading,setIsLoading] = useState<boolean>(false)


  const form = useForm<z.infer<typeof LoansSchema>>({
    resolver: zodResolver(LoansSchema),
    mode: "onChange",
    defaultValues:{
        startDate: new Date(),
        endDate: new Date(),
        renewal: false,
        totalAmount: ''
    }
  })


  const router = useRouter()


  const onSubmitLoan = async () => {


    try{

        setIsLoading(true)

        await onCreateLoan(params.id,date as Date,finalDateCalculated as Date,form.getValues().totalAmount as string)


        router.push('/loans')

    }catch(error)
    {
        console.log(error)
    }finally{
        setIsLoading(false)
    }

  }

  useEffect(() => {

    if(date)
    {
        setFinalDateCalculated(addDays(date,12))

        //console.log(date)
    }

  },[date])

  return (
   <div className="flex flex-col items-center mt-10 p-6">
         <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmitLoan)} className="flex flex-col gap-6 mt-1" >
                            <div className="flex lg:flex-row md:flex-row gap-5 flex-col">

                            <FormField 
                                    control={form.control}
                                    name="startDate"
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
                                                    disabled={isLoading}
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

                            {date &&   <FormField 
                                    control={form.control}
                                    name="endDate"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                            <Popover >
                                                <PopoverTrigger   asChild>
                                                    <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal ",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                    disabled={true}
                                                    >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {finalDateCalculated ? format(finalDateCalculated, "PPP") : <span className='ml-1'>Elige un fecha</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar 
                                                    mode="single"
                                                    selected={finalDateCalculated}
                                                    onSelect={setFinalDateCalculated}
                                                    initialFocus
                                                    
                                                    />
                                                    
                                                </PopoverContent>
                                            </Popover>
                                            </FormControl>
                                        </FormItem>
                                    
                                    )}
                            
                            />}

                    
                            </div>


                            <FormField 
                                control={form.control}
                                name="totalAmount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                        <Input disabled={isLoading} {...field} placeholder="Ingresa el monto prestado" type="number" />
                                        </FormControl>
                                    </FormItem>
                                
                                )}
                            />

                            <Button type="submit"  className="" disabled={isLoading}  >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Agregar Cliente"}
                            </Button>


                        
                        </form>

            </Form>
   </div>
  )
}

export default CreateLoanPage