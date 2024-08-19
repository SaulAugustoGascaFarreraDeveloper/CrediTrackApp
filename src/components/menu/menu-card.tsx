"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type MenuCardProps = {
    title: string
    description: string
    content: string
    route: string
    countNumber?: number
}


const MenuCard = ({title,description,content,route,countNumber} : MenuCardProps) => {

   
    const router = useRouter()

  return (
    <Card onClick={() => router.push(`/${route}`)} className='border-2 hover:border-r-4 hover:border-b-4 rounded-lg border-black cursor-pointer'>
        <CardHeader>
            <CardTitle className='font-semibold text-4xl' >{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <h2>{content}</h2>
            <p>Cantidad: {countNumber} {title.startsWith("C" || "c") ? "Clientes" : "Préstamos"}</p>
        </CardContent>
    </Card>
  )
}

export default MenuCard