"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

const RouteMenuButton = () => {

    const router = useRouter()

    const handleClick = (e: any) => {

        e.preventDefault()

        router.push('/')

    }

  return (
    <Button onClick={handleClick} >
         Menú
    </Button>
  )
}

export default RouteMenuButton