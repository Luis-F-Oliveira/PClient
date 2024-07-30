'use client'

import React from 'react'
import { IRole } from '@/@types/auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { toast } from '@/components/ui/use-toast'

const schema = z.object({
    role: z.string({
        required_error: 'Por favor selecione uma permissão'
    })
})

type IForm = z.infer<typeof schema>

interface Props {
    id: string
}

export const Forms: React.FC<Props> = ({ id }) => {
    const { data: roles = [] } = useSWR<IRole[]>(
        '/api/roles', async () =>
        await axios
            .get('/api/roles')
            .then(res => res.data)
    )

    const form = useForm<IForm>({
        resolver: zodResolver(schema)
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: IForm) => {
        const role = roles.filter((role) => role.name === values.role)
        const data = {
            role_id: role[0].id,
            user_id: id
        }

        axios.post('/api/roles_on_users', data)
        .then((res) => {
            const { message } = res.data
            
            toast({
                title: 'Permissão adicionada',
                description: message
            })
        })
        .catch((err) => {
            const { message } = err.response.data

            toast({
                title: 'Erro ao adicionar',
                description: message
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-1 items-center">
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Permissões" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roles.map((items) => (
                                            <SelectItem key={items.id} value={`${items.name}`}>{items.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="submit" isSubmitting={isSubmitting}>
                                    <Plus />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}