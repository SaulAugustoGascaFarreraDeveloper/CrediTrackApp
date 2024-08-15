"use client"
import { onGetAllLoans } from '@/actions/loans'
import { DrawerLoan } from '@/components/loan/add-loan-drawer'
import { DataTableLoans } from '@/components/loan/loan-data-table'
import { Loan } from '@prisma/client'
import React, { useEffect, useState } from 'react'

const LoansPage = () => {

  const [isLoans,setIsLoans] = useState<{clientd: true,startDate: Date,endDate: Date,totalAmount: string}[] | undefined>([])


  const handleLoans = async() => {
     const l = await onGetAllLoans()

     setIsLoans(l?.loans as [] || undefined)

  }

  useEffect(() => {
    handleLoans()
  },[isLoans])

  return (
    <div className="flex flex-col items-center p-8 gap-6">
      {/* <DrawerLoan /> */}
      
        <h2 className='font-semibold'>Tabla de Préstamos</h2> 
      
      <DataTableLoans data={isLoans as [] || []} />
    </div>
  )
}

export default LoansPage