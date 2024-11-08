'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/toggle-theme"
import { useAuth } from "@/hooks/auth"
import { BicepsFlexed, Calendar, Cog, HeartPulse, MessageCircleMore, Users, WheatOff } from 'lucide-react'
import Link from "next/link"

export function AppSidebar() {
    const { open } = useSidebar()
    const { user, logout } = useAuth({})

    return (
        <Sidebar variant='floating' collapsible='icon' >
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Requisitos Funcionais</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/public/health_tips'>
                                        <HeartPulse />
                                        <span>Dicas de Saúde</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/public/exercise_plans'>
                                        <BicepsFlexed />
                                        <span>Planos de Exercício</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/public/diet_plans'>
                                        <WheatOff />
                                        <span>
                                            Planos de Dieta
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Suporte de Comunidade</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/public/forum'>
                                        <Users />
                                        <span>Fóruns</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/public/event'>
                                        <Calendar />
                                        <span>Eventos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href='/public/witness'>
                                        <MessageCircleMore />
                                        <span>
                                            Testemunhos
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex flex-col">
                                    {open ? "Configurações" : <Cog />}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="right"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuLabel>
                                    {user?.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href='/public/user'>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <span>Conta</span>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <ModeToggle />
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                                    <span>Deslogar</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
