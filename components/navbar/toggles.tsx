'use client'

import React from 'react'
import { useAuth } from '@/hooks/auth'
import { ModeToggle } from '@/components/ui/toggle-theme'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export const Toggles = () => {
    const { logout } = useAuth({})

    return (
        <div className='flex items-center gap-2'>
            <ModeToggle />
            <Button
                onClick={logout}
                type='button'
                variant='outline'
            >
                <LogOut size='sm' />
            </Button>
        </div>
    )
}
