import Navbar from "@/components/global/navbar";
import Menu from "@/components/menu";
import MenuCard from "@/components/menu/menu-card";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";


const GetCountData = async() => {

  const user = await currentUser()

  if(!user) return redirect('/sign-in')

  const findUser = await db.user.findUnique({
    where:{
      clerkId: user?.id
    }
  })

  if(!findUser) return null

  const [clientsCount,loansCount,paymentsCount] = await Promise.all([
    db.client.count({
      where:{
        userId: findUser.id
      }
    }),
    db.loan.count({
      where:{
        client:{
          userId: findUser.id
        }
      }
    }),
    db.payment.count({
      where:{
        loan:{
          client:{
            userId: findUser.id
          }
        }
      }
    })
  ])

  return{
    totalClients: clientsCount,
    totalLoans: loansCount,
    totalPayments: paymentsCount
  }
} 

export default async function Home() {

  // const clientsCount = await db.client.count()

  // const loansCount = await db.loan.count()

  const [clientsData] = await Promise.all([
    GetCountData()
  ])

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 gap-6 overflow-y-auto">
      <h1 className="font-semibold text-blue-600 text-2xl">CREDI TRACK</h1>
    
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3 items-center">
              <MenuCard 
                    title='Clientes' 
                    description='Ver Clientes'
                    content='Aqui puedes ver información sobre tus clientes'
                    route='clients'
                    countNumber={clientsData?.totalClients}
                />

                <MenuCard 
                    title='Préstamos' 
                    description='Ver Préstamos'
                    content='Aqui puedes ver información sobre tus préstamo'
                    route='loans'
                    countNumber={clientsData?.totalLoans}
                />

                {/* <MenuCard 
                    title='Pagos' 
                    description='Ver Pagos'
                    content='Aqui puedes ver información sobre tus pagos'
                    route='payments'
                    countNumber={clientsData.totalPayments}
                /> */}
      </div>
     
    </main>
  );
}
