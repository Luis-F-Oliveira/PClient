'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/auth'
import { useToast } from '@/hooks/use-toast'
import { BadgeCheck, BadgeX } from 'lucide-react'
import React from 'react'

export const Perfil = () => {
    const { user, resendEmailVerification } = useAuth({})
    const { toast } = useToast()

    const handleVerification = async () => {
        await resendEmailVerification()
        toast({
            title: 'Aviso',
            description: 'Um novo email de verificação foi enviado para seu endereço.'
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Informações do Perfil
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className='flex flex-col'>
                    <span className='font-bold'>Nome:</span>
                    {user?.name}
                </p>
                <div>
                    <div className='flex items-center gap-3'>
                        <p className='flex flex-col'>
                            <span className='font-bold'>E-mail</span>
                            {user?.email}
                        </p>
                        {user?.email_verified_at ? <BadgeCheck /> : <BadgeX />}
                    </div>
                    {user?.email_verified_at ? null : (
                        <p className='text-sm text-blue-900 underline cursor-pointer' onClick={handleVerification}>
                            Email não verificado, clique aqui!
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
