
import React, { Dispatch, SetStateAction } from 'react'
import { UseFormRegister,FieldErrors,FieldValues } from 'react-hook-form'
import { ErrorMessage} from "@hookform/error-message"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { PopoverTrigger,Popover, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { format } from "date-fns"

type Props = {
    type?: 'text' | 'email' | 'password' | "number"
    inputType: 'select' | 'input' | 'textarea' | 'date'
    options?: { value: string; label: string; id: string }[]
    label?: string
    placeholder: string
    register: UseFormRegister<any>
    name: string
    errors: FieldErrors<FieldValues>
    lines?: number
    form?: string
    defaultValue?: string
    val?: string
    ref1?: string
    setRef1?: Dispatch<SetStateAction<string>>
    date?: Date
    setDate?: Dispatch<SetStateAction<Date | undefined>>
    enabled?: boolean
  }


const FormGenerator = ({type,inputType,options,label,placeholder,register,name,errors,lines,form,defaultValue,val,ref1,setRef1,date,setDate,enabled} : Props) => {
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(setRef1){
            setRef1(e.target.value)
        }

    }

    //const [date, setDate] = React.useState<Date>()

    switch(inputType){
        case 'input':
            default:
            return(
                <Label className='flex flex-col gap-2' htmlFor={`input-${label}`} >
                    {label && label}
                    <Input 
                        id={`input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        form={form}
                        defaultValue={defaultValue}
                        {...register(name)}
                        value={ref1}
                        onChange={handleChange}
                        
                    />
                    <ErrorMessage 
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                        <p className="text-red-400 mt-2">
                            {message === 'Required' ? '' : message}
                        </p>
                        )}
                    />
                    

                </Label>
            )

        case 'date':
                return(
                    <Popover  >
                        <PopoverTrigger disabled={enabled} asChild>
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
                            {...register(name)}
                            />
                             
                        </PopoverContent>
                    </Popover>
                )
                
    }

}

export default FormGenerator