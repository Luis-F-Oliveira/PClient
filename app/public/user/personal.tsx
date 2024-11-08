'use client'

import React from 'react'
import useSWR from 'swr'
import { IPersonal } from '@/@types/auth'
import axios from '@/lib/axios'
import { Edit } from './edit'
import { Create } from './create'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'


export const Personal = () => {
    const { data: data } = useSWR<IPersonal>(
        '/api/personals', async () =>
        await axios
            .get('/api/personals')
            .then(res => res.data)
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                    Informações Pessoais
                    <Edit />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {data ? (
                    <div className='space-y-3'>
                        <p className='flex flex-col'>
                            <span className='font-bold'>Idade:</span>
                            {data?.age} anos
                        </p>
                        <p className='flex flex-col'>
                            <span className='font-bold'>Peso:</span>
                            {data?.weight} kg
                        </p>
                        <p className='flex flex-col'>
                            <span className='font-bold'>Altura:</span>
                            {data?.heigth} m
                        </p>
                        <p className='flex flex-col'>
                            <span className='font-bold'>Objetivos de Saúde:</span>
                            {data?.health_goals}
                        </p>
                    </div>
                ) : <Create />}
            </CardContent>
        </Card>
    )
}
