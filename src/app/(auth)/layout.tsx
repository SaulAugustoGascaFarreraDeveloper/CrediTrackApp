import React, { ReactNode } from 'react'




const Layout = ({children} : {children: ReactNode}) => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-4">
        <h1 className='font-semibold'>CREDI TRACK</h1>
        {children}
    </div>
  )
}

export default Layout