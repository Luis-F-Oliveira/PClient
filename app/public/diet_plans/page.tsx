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
        await axios.post('/api/diets', values)
            .then(() => {
                toast({
                    title: "Sucesso",
                    description: "Receita adicionada com sucesso!",
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
                <h1 className="text-3xl font-bold">Sugestões de Refeições e Receitas</h1>
                <p className="mt-2">Receitas personalizadas para objetivos de saúde</p>
            </div>
            <div className="p-6 md:p-12">
                <div className="container mx-auto space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Categorias de Receitas</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-secondary-foreground hover:bg-white dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Nutrição</h3>
                                <p className="text-sm mt-2">Refeições equilibradas e nutritivas.</p>
                            </button>
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-secondary-foreground hover:bg-white dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Baixas Calorias</h3>
                                <p className="text-sm mt-2">Opções de baixa caloria para emagrecimento.</p>
                            </button>
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-secondary-foreground hover:bg-white dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Proteínas</h3>
                                <p className="text-sm mt-2">Receitas com foco em proteínas para ganho muscular.</p>
                            </button>
                            <button className="bg-secondary p-6 rounded-lg shadow-md hover:bg-secondary-foreground hover:bg-white dark:hover:text-neutral-950">
                                <h3 className="text-lg font-semibold">Vegetariano</h3>
                                <p className="text-sm mt-2">Opções vegetarianas e nutritivas.</p>
                            </button>
                        </div>
                    </section>
                    <section className="bg-secondary p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Planeje sua Refeição e Lista de Compras</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-lg font-medium">Nome da Refeição</FormLabel>
                                            <FormControl>
                                                <Input className='dark:bg-secondary-foreground dark:text-neutral-950' type='text' placeholder='Ex: Café da Manhã Saudável' {...field} />
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
                                            <FormLabel className="block text-lg font-medium">Categoria</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='dark:bg-secondary-foreground dark:text-neutral-950'>
                                                        <SelectValue placeholder="Selecione uma categoria" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Nutrição">Nutrição</SelectItem>
                                                    <SelectItem value="Baixas Calorias">Baixas Calorias</SelectItem>
                                                    <SelectItem value="Proteínas">Proteínas</SelectItem>
                                                    <SelectItem value="Vegetariano">Vegetariano</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className='w-full' isSubmitting={isSubmitting}>
                                    Salvar Refeição
                                </Button>
                            </form>
                        </Form>
                    </section>
                </div>
            </div>
            <div className="text-center p-4 mt-8">
                <p>&copy; 2024 Sugestões de Refeições e Receitas</p>
            </div>
        </div>
    )
}
