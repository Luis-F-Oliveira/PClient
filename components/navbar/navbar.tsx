import React from 'react'
import { Navigation } from './navigation'
import { Toggles } from './toggles'
import { cookies } from 'next/headers'

export default async function Navbar() {
  const tokens = cookies().getAll()

  return (
    <nav className='border-b shadow mb-5 py-3 flex justify-around items-center'>
        <h1 className='text-2xl'>Exemplo</h1>
        <Navigation tokens={tokens} />
        <Toggles />
    </nav>
  )
}
