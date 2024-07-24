'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const schema = z.object({
    email: z.string({
        required_error: "O email deve ser preenchido"
    }).email({
        message: 'Insira um endereço de email válido'
    }).max(255, {
        message: 'O valor máximo de caracteres para o campo é de 255'
    })
})

type IForm = z.infer<typeof schema>

export default function Page() {
    const [message, setMessage] = React.useState('')

    const { forgotPassword } = useAuth({
        middleware: 'guest'
    })

    const form = useForm<IForm>({
        resolver: zodResolver(schema)
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: IForm) => {
        await forgotPassword(values)
            .then(() => {
                setMessage('Um email de recuperação de senha foi enviado para o seu endereço de email.')
                form.reset()
            })
            .catch(() => {
                setMessage('Email de recuperação não foi encontrado em nosso banco de dados.')
            })
    }

    return (
        <Card className='w-1/4'>
            <CardHeader className='text-center'>
                <CardTitle>Resetar Senha</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Digite o email cadastrado.
                                    </FormDescription>
                                    <FormMessage>
                                        {message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button type='submit' disabled={isSubmitting}>
                                Enviar
                            </Button>
                            <Button type='button' variant='link'>
                                <Link href='/auth/login'>
                                    Retornar à página de acesso
                                </Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}