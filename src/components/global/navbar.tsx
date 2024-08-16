import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {

  return (
    <div className='flex justify-between items-end '>
        <UserButton />
    </div>
  )
}

export default Navbar