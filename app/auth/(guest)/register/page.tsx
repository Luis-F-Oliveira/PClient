'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
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
import { cn } from "@/lib/utils"

const schema = z
    .object({
        name: z.string({
            required_error: "O nome deve ser preenchido"
        }).max(255, {
            message: 'O valor máximo de caracteres para o campo é de 255'
        }),
        email: z.string({
            required_error: "O email deve ser preenchido"
        }).email({
            message: 'Insira um endereço de email válido'
        }),
        password: z.string({
            required_error: "A senha deve ser preenchida"
        }).min(8, {
            message: 'A senha deve ter no mínimo 8 caracteres'
        }).max(255, {
            message: 'O valor máximo de caracteres para o campo é de 255'
        }),
        password_confirmation: z.string({
            required_error: "Confirmar senha deve ser preenchido"
        }).min(8, {
            message: 'Confirmar senha deve ter no mínimo 8 caracteres'
        }).max(255, {
            message: 'O valor máximo de caracteres para o campo é de 255'
        })
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'As senhas devem ser iguais',
        path: ["confirmPassword"]
    })

type IForm = z.infer<typeof schema>

export default function Page() {
    const { register } = useAuth({ 
        middleware: 'guest', 
        redirectIfAuthenticated: '/' 
    })

    const form = useForm<IForm>({
        resolver: zodResolver(schema)
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: IForm) => {
        await register(values)
    }

    return (
        <Card className='w-1/4'>
            <CardHeader className='text-center'>
                <CardTitle>Registrar</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password_confirmation'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar Senha</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button
                                className={cn(isSubmitting ? 'cursor-no-drop' : 'cursor-pointer')}
                                disabled={isSubmitting}
                                type='submit'
                            >
                                Cadastrar
                            </Button>
                            <Button type='button' variant='link'>
                                <Link href='/auth/login'>
                                    Já possuo registro
                                </Link>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
