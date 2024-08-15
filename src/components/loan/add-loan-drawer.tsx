"use client"
import * as React from "react"
import { CalendarIcon, Loader2, Minus, Plus } from "lucide-react"
//import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useClient } from "@/hooks/clients/use-clients"
import { Input } from "../ui/input"
import FormGenerator from "../shared/form-generator"
import  {useLoans}  from "@/hooks/loans/use-loans"
import { addDays, format } from "date-fns"
import { onCreateLoan } from "@/actions/loans"
import { useForm} from "react-hook-form"
import { z } from "zod"
import { LoansSchema } from "@/schemas/loans.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { cn } from "@/lib/utils"


export function DrawerLoan() {

  

  const [date,setDate] = React.useState<Date>()
  const [finalDateCalculated,setFinalDateCalculated] = React.useState<Date>()


  //const {errors,loading,register,onSubmitLoan} = useLoans("a62902a6-8c64-4246-8582-3c5830139cb7",date,setDate)

  const [isLoading,setIsLoading] = React.useState<boolean>(false)


  const form = useForm<z.infer<typeof LoansSchema>>({
    resolver: zodResolver(LoansSchema),
    mode: "onChange",
    defaultValues:{
        startDate: new Date(),
        endDate: new Date,
        renewal: false,
        totalAmount: ''
    }
  })


  const onSubmitLoan = async () => {


    try{

        setIsLoading(true)

        await onCreateLoan("a62902a6-8c64-4246-8582-3c5830139cb7",date as Date,finalDateCalculated as Date,form.getValues().totalAmount as string)


    }catch(error)
    {
        console.log(error)
    }finally{
        setIsLoading(false)
    }

  }

  const handleSubmitLoan = async () => {

    setIsLoading(true)

    // await onCreateLoan("a62902a6-8c64-4246-8582-3c5830139cb7",date as Date,finalDateCalculated as Date,"6500")

    // setIsLoading(false)

  }

  React.useEffect(() => {

    if(date)
    {
        setFinalDateCalculated(addDays(date,12))

        //console.log(date)
    }

  },[date])

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-x-2">Agregar Prestamo <Plus /> </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Nuevo Prestamo</DrawerTitle>
            <DrawerDescription>agrega los datos para un nuevo prestamo</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center">


                <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmitLoan)} className="flex flex-col gap-6 mt-1" >
                    <div className="flex flex-row gap-5">

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

{/* 
                    <FormGenerator 
                      name="startDate"
                      placeholder=""
                      type="text"
                      inputType="date"
                      errors={errors}
                      register={register}
                      date={date}
                      setDate={setDate}

                    />

                    {date && 
                    <FormGenerator 
                      name="endDate"
                      placeholder=""
                      type="text"
                      inputType="date"
                      errors={errors}
                      register={register}
                      date={finalDateCalculated}
                      setDate={setFinalDateCalculated}

                    />} */}

                    

                    </div>


                    <FormField 
                        control={form.control}
                        name="totalAmount"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                 <Input {...field} placeholder="Ingresa el monto prestado" type="number" />
                                </FormControl>
                            </FormItem>
                           
                        )}
                    />


                    {/* <FormGenerator 
                      type="number"
                      inputType="input"
                      placeholder="ingresa el monto del prestamo"
                      errors={errors}
                      register={register}
                      name="totalAmount"
                    /> */}

                   
                  <DrawerFooter>
                    <Button type="submit"  className=""  >
                      {isLoading ? <Loader2 className="animate-spin" /> : "Agregar Cliente"}
                    </Button>
                    <DrawerClose  asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                
                  
              </form>

                </Form>
              
            
            </div>
            
          </div>
        
        </div>
      </DrawerContent>
    </Drawer>
  )
}
