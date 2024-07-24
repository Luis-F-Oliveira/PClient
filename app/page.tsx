'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth'
import React from 'react'

export default function Page() {
  const { user, logout } = useAuth({})

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-3'>
      <section>
        <h1>User</h1>
        <p>{user?.id}</p>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.email_verified_at}</p>
        <p>{user?.created_at}</p>
        <p>{user?.updated_at}</p>
      </section>
      <Button onClick={logout}>
        Sair
      </Button>
    </div>
  )
}
