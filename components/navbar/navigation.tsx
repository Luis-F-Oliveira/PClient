'use client'

import React from 'react'
import Link from 'next/link'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { listOfPages } from './list'

interface IToken {
    name: string
    value: string
}

interface Props {
    tokens: IToken[]
}

export const Navigation: React.FC<Props> = ({ tokens }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const hasToken = (role: string) => {
        return tokens.some(token => token.name === role)
    }

    const filteredPages = listOfPages.filter(page => {
        if (page.roles.length === 0 || page.roles[0] === "") {
            return true
        }
        return page.roles.some(role => hasToken(role))
    })

    const groups = filteredPages.reduce((acc, page) => {
        if (!acc[page.group]) {
            acc[page.group] = []
        }
        acc[page.group].push(page)
        return acc
    }, {} as Record<string, typeof listOfPages>)

    const handleOpen = () => {
        setIsOpen(true)
    }

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen((isOpen) => !isOpen)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <div onClick={handleOpen} className='border rounded-sm p-2 flex items-center gap-2 cursor-pointer hover:bg-secondary transition-colors duration-300'>
                <p className='text-sm'>Navegar na aplicação</p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </div>
            <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
                <CommandInput placeholder="Procurar página..." />
                <CommandList>
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                    {Object.keys(groups).map((group, index) => (
                        <CommandGroup className='w-full mb-2' key={index} heading={group}>
                            {groups[group].map((items, index) => (
                                    <Link key={index} className='flex items-center py-1 pl-1.5 text-lg hover:bg-secondary transition-colors duration-300 rounded' href={items.path}>
                                        {items.icon}
                                        {items.name}
                                        <CommandItem className='hidden'>
                                            {items.name}
                                        </CommandItem>
                                    </Link>
                                )
                            )}
                        </CommandGroup>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    )
}
