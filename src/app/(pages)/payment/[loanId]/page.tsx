import React from 'react'

type PaymentPageProps = {
    params:{
        loanId: string
    }
}


const PaymentPage = ({params} : PaymentPageProps) => {
  return (
    <div>PaymentPage {params.loanId}</div>
  )
}

export default PaymentPage