"use client"
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { AlignCenter, GripHorizontal, XIcon } from 'lucide-react'

const Navbar = () => {

  const router = useRouter()

  const [isClick,setIsClick] = useState<boolean>(false)

  const toggleNavbar = () => {
    setIsClick(!isClick)
  }

  return (
    <nav className='bg-slate-100/40 border-b-2 border-blue-500'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
              <div className='flex-shrink-0' >
                  <a href='/'  className='text-blue-600 font-semibold text-2xl rounded-lg hover:cursor-pointer hover:bg-blue-200/50' >
                    Credi Track
                  </a>
              </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4 ml-4">
                <a href='/clients' className='text-black font-semibold rounded-lg hover:bg-slate-400/20  p-2 '>
                  Clientes
                </a>
                <a href='/loans' className='text-black font-semibold rounded-lg hover:bg-slate-400/20  p-2 '>
                  Prestamos
                </a>
                <UserButton />
            </div>
          </div>

          <div className="md:hidden lg:hidden sm:block flex items-center">
              <Button className='inline-flex items-center justify-center p-2 
              rounded-md text-white md:text-white bg-blue-700/80 ' 
              onClick={toggleNavbar}>
                {isClick ? (
                //   <svg  className="h-6 w-6"
                //   xmlns="http://www.w3.org/2000/svg"
                //   fill="none"
                //   viewBox="0 0 24 24"
                //   stroke="currentColor" >
                //   <path
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //     strokeWidth={2}
                //     d="M6 18L18 6M6 6l12 12"/>
                // </svg>
                <XIcon />
                ) :(
                //   <svg  className="h-6 w-6"
                //   xmlns="http://www.w3.org/2000/svg"
                //   fill="none"
                //   viewBox="0 0 24 24"
                //   stroke="currentColor">
                //   <path
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //     strokeWidth={2}
                //     d="M4 6h16M4 12h16m-7 6h7"/>
                // </svg>
                <AlignCenter />
                )}
              </Button>
          </div>
         
        </div>
         
      </div>
      {isClick && (
        <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                
                <a href='/clients' className='text-black font-semibold rounded-lg hover:bg-slate-400/20  p-2  block'>
                  Clientes
                </a>
                <a href='/loans' className='text-black font-semibold rounded-lg hover:bg-slate-400/20  p-2  block'>
                  Prestamos
                </a>
               
                <UserButton />
            </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar