'use client'

import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/toggle-theme'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  const { user, logout, resendEmailVerification } = useAuth({})
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center gap-3'>
      <section>
        <h1>User</h1>
        <p>Id: {user?.id}</p>
        <p>nome: {user?.name}</p>
        <p>email: {user?.email}</p>
        <p>email validado: {user?.email_verified_at}</p>
        <p>criado em: {user?.created_at}</p>
        <p>atualizado em: {user?.updated_at}</p>
      </section>
      <div className='space-x-2'>
        <Button onClick={logout}>
          Sair
        </Button>
        <Button onClick={resendEmailVerification}>
          Verificar Email
        </Button>
        <ModeToggle />
        <Button variant='link'>
          <Link href='/admin/users'>
            Usuários
          </Link>
        </Button>
      </div>
    </div>
  )
}
