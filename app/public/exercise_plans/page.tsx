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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
    name: z.string(),
    option: z.string()
})

type IForm = z.infer<typeof schema>

export default function Page() {
    const { toast } = useToast()
    const form = useForm<IForm>({
        resolver: zodResolver(schema),
        defaultValues: {},
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: IForm) => {
        await axios.post('/api/exercises', values)
            .then(() => {
                toast({
                    title: "Successo",
                    description: "Exercício adicionado com sucesso!",
                })
            })
            .catch((err) => {
                const { message } = err.response.data

                toast({
                    title: "Falha",
                    description: message,
                    variant: 'destructive'
                })
            })
    }

    return (
        <div className='mt-5 min-h-screen'>
            <div className="p-6 text-center">
                <h1 className="text-3xl font-bold">Biblioteca de Exercícios</h1>
                <p className="mt-2">Encontre e personalize sua rotina de treino</p>
            </div>
            <div className="p-6 md:p-12">
                <div className="container mx-auto space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Categorias de Exercícios</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-white dark:hover:bg-secondary-foreground dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Aeróbico</h3>
                                <p className="text-sm mt-2">Exercícios para melhorar o condicionamento cardiovascular.</p>
                            </button>
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-white dark:hover:bg-secondary-foreground dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Musculação</h3>
                                <p className="text-sm mt-2">Treino de força para ganho de massa muscular.</p>
                            </button>
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-white dark:hover:bg-secondary-foreground dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Yoga</h3>
                                <p className="text-sm mt-2">Exercícios para flexibilidade e equilíbrio mental.</p>
                            </button>
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-white dark:hover:bg-secondary-foreground dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Alongamento</h3>
                                <p className="text-sm mt-2">Melhore sua flexibilidade e previna lesões.</p>
                            </button>
                        </div>
                    </section>
                    <section className="bg-secondary p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Crie e Personalize Sua Rotina</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-lg font-medium">Nome da Rotina</FormLabel>
                                            <FormControl>
                                                <Input className='dark:bg-secondary-foreground dark:text-neutral-950' type='text' placeholder='Ex: Treino de Segunda-Feira' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='option'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-lg font-medium">E-mail</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='dark:bg-secondary-foreground dark:text-neutral-950'>
                                                        <SelectValue placeholder="Select a verified email to display" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Aeróbico - Corrida">Aeróbico - Corrida</SelectItem>
                                                    <SelectItem value="Aeróbico - Pular Corda">Aeróbico - Pular Corda</SelectItem>
                                                    <SelectItem value="Musculação - Supino">Musculação - Supino</SelectItem>
                                                    <SelectItem value="Yoga - Saudação ao Sol">Yoga - Saudação ao Sol</SelectItem>
                                                    <SelectItem value="Alongamento - Pernas">Alongamento - Pernas</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='w-full' isSubmitting={isSubmitting}>
                                    Salvar Rotina
                                </Button>
                            </form>
                        </Form>
                    </section>
                </div>
            </div>
            <div className="text-center p-4 mt-8">
                <p>&copy; 2024 Biblioteca de Exercícios</p>
            </div>
        </div>
    )
}
