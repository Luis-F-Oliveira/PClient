'use client'

import React from 'react'

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription
} from '@/components/ui/card'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IUser } from '@/@types/auth'
import axios from '@/lib/axios'
import { Info } from 'lucide-react'
import useSWR from 'swr'
import { Forms } from './forms'
import { Badges } from './badges'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

interface Props {
    params: { id: string }
}


export default function Page({ params }: Props) {
    const router = useRouter()
    const { data: user } = useSWR<IUser>(
        '/api/users', async () =>
        await axios
            .get(`/api/users/${params.id}`)
            .then(res => res.data)
    )

    const handleDelete = () => {
        axios.delete(`/api/users/${params.id}`)
        .then(() => router.push('/admin/users'))
        .catch((err) => {
            const { message } = err.response.data

            toast({
                title: 'Erro ao remover',
                description: message
            })
        })
    }

    return (
        <div className='h-[calc(100vh-1.25rem)] flex flex-col justify-center items-center'>
            <Card className='w-1/3'>
                <CardHeader className='text-center'>
                    <CardTitle>
                        Editar Usuário: {user ? user.name : 'Carregando...'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardTitle>Permissões de usuário</CardTitle>
                    <CardDescription>
                        <Link className="flex items-center gap-1 mb-3" href="">
                            <Info size={16} />
                            saiba mais
                        </Link>
                    </CardDescription>
                    <section className='space-y-3'>
                        <Forms id={params.id} />
                        <Badges id={params.id} />
                    </section>
                </CardContent>
                <CardFooter className='flex justify-end items-center gap-2'>
                    <AlertDialog>
                        <AlertDialogTrigger
                            className='h-8 rounded-md px-3 text-xs bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
                        >
                            deletar
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita. Isso excluirá permanentemente essa conta
                                    e remova seus dados de nossos servidores.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button size='sm'>
                        <Link href='/admin/users'>
                            Retornar
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
