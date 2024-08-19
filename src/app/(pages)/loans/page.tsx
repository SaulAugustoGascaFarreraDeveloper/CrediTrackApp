import { onGetAllLoans } from '@/actions/loans'
import { DrawerLoan } from '@/components/loan/add-loan-drawer'
import { DataTableLoans } from '@/components/loan/loan-data-table'
import RouteMenuButton from '@/components/shared/route-menu-button'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { Loan } from '@prisma/client'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LoansPage = async () => {

  // const [isLoans,setIsLoans] = useState<Loan[] | undefined>([])


  // const handleLoans = async() => {
  //    const l = await onGetAllLoans()

  //    setIsLoans(l?.loans as [] || undefined)

  // }

  // useEffect(() => {
  //   handleLoans()
  // },[isLoans])


  const user = await currentUser()

    if(!user) return  redirect("/sign-in")

    const findUser = await db.user.findUnique({
        where:{
            clerkId: user.id
        }
    })

    if(!findUser) return null

  const isLoans = await db.loan.findMany({
    where:{
      client:{
        userId: findUser.id
      }
    },
    select:{
      client:{
        select:{
          name: true,
          lastName: true
        }
      },
      startDate: true,
      endDate: true,
      totalAmount: true,
      clientId: true,
      id: true,
      greatTotalAmount: true,
      interestRate: true,
      remainingBalance: true,
      renewal: true,
      moneyNotReceived: true,
    }
  })

  return (
    <div className="flex flex-col items-center p-8 gap-6">
      {/* <DrawerLoan /> */}
      
        <h2 className='font-semibold'>Tabla de Préstamos</h2> 
      
        <DataTableLoans data={isLoans as [] || []} />

        <div>
          <RouteMenuButton />
        </div>
    </div>
  )
}

export default LoansPage