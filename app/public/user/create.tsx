'use client'

import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'

export const schema = z.object({
    age: z.number()
        .int("Idade precisa ser um número inteiro")
        .min(0, "Idade não pode ser negativa")
        .max(150, "Idade máxima permitida é 150"),

    weight: z.number()
        .min(0.00, "Peso mínimo é 0.00")
        .max(999.99, "Peso máximo é 999.99")
        .refine(val => val.toFixed(2) === val.toString(), {
            message: "Peso deve ter até duas casas decimais"
        }),

    height: z.number()
        .min(0.00, "Altura mínima é 0.00 metros")
        .max(9.99, "Altura máxima é 9.99 metros")
        .refine(val => val.toFixed(2) === val.toString(), {
            message: "Altura deve ter até duas casas decimais"
        }),

    health_goals: z.string()
        .min(1, "Objetivos de saúde são obrigatórios")
        .max(500, "Objetivos de saúde não podem exceder 500 caracteres"),
})

export type IForm = z.infer<typeof schema>

const Forms = () => {
    const { user } = useAuth({})
    const { toast } = useToast()
    const form = useForm<IForm>({
        resolver: zodResolver(schema),
        defaultValues: {}
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: IForm) => {
        const userId = user?.id && user.id > 0 ? user.id : 666
        const formValues = { ...values, user_id: userId }

        await axios.post('/api/personals', formValues)
            .then(() => {
                toast({
                    title: 'Dados Adicionados!'
                })
            })
            .catch((err) => {
                const { message } = err.response.data

                toast({
                    title: 'Erro ao adicionar dados',
                    description: message,
                    variant: 'destructive'
                })
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                <FormField
                    control={form.control}
                    name='age'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Idade</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='weight'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Peso</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormDescription>
                                Exemplo: 80,23 (É considerado kilograma)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='height'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Altura</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormDescription>
                                Exemplo: 1,75 (É considerado metro)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='health_goals'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Objetivos de Saúde</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant='destructive'>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type='submit' isSubmitting={isSubmitting}>
                        Criar
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export const Create = () => {
    return (
        <div className='text-center'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Adicionar Informações
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar</DialogTitle>
                    </DialogHeader>
                    <Forms />
                </DialogContent>
            </Dialog>

        </div>
    )
}
