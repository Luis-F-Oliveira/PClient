'use client'

import { IExercise } from '@/@types/organization'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from '@/hooks/use-toast'
import axios from '@/lib/axios'
import { Trash } from 'lucide-react'
import React from 'react'
import useSWR from 'swr'

export const Diet = () => {
    const { toast } = useToast()
    const { data: data = [], mutate } = useSWR<IExercise[]>(
        '/api/diets', async () =>
        axios
            .get('/api/diets')
            .then(res => res.data)
    )

    const remove = async (id: number) => {
        await axios.delete('/api/diets/' + id)
            .then(() => mutate())
            .catch((err) => {
                const { message } = err.response.data

                toast({
                    title: 'Falha ao excluir',
                    description: message,
                    variant: 'destructive'
                })
            })
    }

    return (
        <TooltipProvider>
            <Card>
                <CardHeader>
                    <CardTitle>Refeições Organizados</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {data.map((items, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className='flex justify-between items-center'>
                                    {items.name}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant='ghost' size='icon'>
                                                <Trash className='cursor-pointer' onClick={() => remove(items.id)} />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Excluir Treino</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{items.option}</p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </TooltipProvider>
    )
}
