'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
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
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { IForum } from '@/@types/chats'

const schema = z.object({
    content: z.string()
})

type IForm = z.infer<typeof schema>

export default function Page() {
    const { toast } = useToast()
    const { data: data = [], mutate } = useSWR<IForum[]>(
        '/api/forums', async () =>
        axios
            .get('/api/forums')
            .then(res => res.data)
    )

    const form = useForm<IForm>({
        resolver: zodResolver(schema)
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: IForm) => {
        await axios.post('/api/forums', values)
            .then(() => {
                mutate()
                form.reset()
            })
            .catch((err) => {
                const { message } = err.response.data

                toast({
                    title: 'Erro ao enviar comentário',
                    description: message,
                    variant: 'destructive'
                })
            })
    }

    return (
        <div className="mt-5 min-h-screen flex flex-col">
            <header className="py-4 text-center">
                <h1 className="text-2xl font-bold">Quadro de Mensagens</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-4 space-y-4">
                {data.map((items, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                {items.user.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                {items.content}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </main>
            <footer className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name='content'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' isSubmitting={isSubmitting} className='w-full'>
                            Enviar Comentário
                        </Button>
                    </form>
                </Form>
            </footer>
        </div>
    )
}
