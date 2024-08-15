
import React, { useEffect, useState } from 'react'
import MenuCard from './menu-card'
import { onGetTotalClients } from '@/actions/clients'
import { count } from 'console'
import { onGetTotalLoans } from '@/actions/loans'

const Menu = async () => {

//   const [count,setCount] = useState<number>(0)

//   const handleCount = async () => {

    
        
//     const t = await onGetTotalClient()

//     if(t) setCount(t)
// }

// useEffect(() => {
//     handleCount()
// })


// const clientCount = await onGetTotalClients()

// const loanCount = await onGetTotalLoans()



  return (
    <>
        <MenuCard 
            title='Clientes' 
            description='Ver Clientes'
            content='Aqui puedes ver informacion sobre tus clientes'
            route='clients'
            //countNumber={clientCount!}
        />
         <MenuCard 
            title='Prestamos' 
            description='Ver Prestamos'
            content='Aqui puedes ver informacion sobre los prestamos de tus clientes'
            route='loans'
            //countNumber={loanCount!}
        />
    </>
  )
}

export default Menu