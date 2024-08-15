"use client"
import * as React from "react"
import { Loader2, Minus, Plus } from "lucide-react"
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


export function DrawerDemo() {

  const {register,errors,onSubmitClient,loading} = useClient()


  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-x-2">Agregar Cliente <Plus /> </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Nuevo Cliente</DrawerTitle>
            <DrawerDescription>agrega los datos para un nuevo cliente</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center">
              
              <form onSubmit={onSubmitClient} className="flex flex-col gap-6 mt-1" >
                 <FormGenerator type="text" register={register} name="name" 
                  placeholder="Ingresa el nombre" 
                  errors={errors} inputType="input"  
                  />
                   <FormGenerator type="text" register={register} name="lastName" 
                    placeholder="Ingresa el apellido" 
                    errors={errors} inputType="input"  
                  />
                  <FormGenerator type="text" register={register} name="phone" 
                    placeholder="Ingresa el telefono" 
                    errors={errors} inputType="input"  
                  />
                  <DrawerFooter>
                    <Button type="submit" className="" >
                      {loading ? <Loader2 className="animate-spin" /> : "Agregar Cliente"}
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                
                  
              </form>
            </div>
            
          </div>
        
        </div>
      </DrawerContent>
    </Drawer>
  )
}
