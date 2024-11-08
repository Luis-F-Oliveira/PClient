import React from 'react'
import { Perfil } from './perfil'
import { Personal } from './personal'
import { Exercise } from './exercise'
import { Diet } from './diet'

export default function Page() {
  return (
    <div className='space-y-5 mt-5'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
        <Perfil />
        <Personal />
      </div>
      <Exercise />
      <Diet />
    </div>
  )
}
