'use client'

import React from 'react'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { IUser } from '@/@types/auth'
import { DataTable } from './data-table'
import { columns } from './columns'

export default function Page() {
    const { data: users = [] } = useSWR<IUser[]>(
        '/api/users', async () =>
        await axios
            .get('/api/users')
            .then(res => res.data)
    )

    return <DataTable data={users} columns={columns} />
}
