'use client'

import React from "react"
import { IPermission } from "@/@types/auth"
import { Badge } from "@/components/ui/badge"
import useSWR from "swr"
import axios from "@/lib/axios"
import { OneEightyRing } from "react-svg-spinners"
import { toast } from "@/components/ui/use-toast"

interface Props {
    id: string
}

export const Badges: React.FC<Props> = ({ id }) => {
    const { data: permissions = [], isLoading, mutate } = useSWR<IPermission[]>(
        `/api/permissions/${id}`, async () =>
        await axios
            .get(`/api/permissions/${id}`)
            .then(res => res.data)
    )

    const remove = async (id: number) => {
        await axios.delete(`/api/roles_on_users/${id}`)
        .then(() => mutate())
        .catch((err) => {
            const { message } = err.response.data

            toast({
                title: 'Erro ao remover',
                description: message
            })
        })
    }

    if (isLoading) return <div className="flex justify-center fill-primary"><OneEightyRing /></div>

    return (
        <section className="flex gap-1 flex-wrap">
            {permissions?.map((item) => (
                <Badge
                    key={item.id}
                    className="cursor-pointer hover:bg-red-500 dark:hover:text-white"
                    onClick={() => remove(item.id)}
                >
                    {item.role.name}
                </Badge>
            ))}
        </section>
    )
}
