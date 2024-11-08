'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export default function Page() {
    const { toast } = useToast()

    const handleClick = (content: string) => {
        toast({
            title: "Inscrição Concluida!",
            description: "Inscrição feita para " + content + "."
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">Eventos de Fitness</h1>
                <p className="mt-2">Participe de caminhadas em grupo ou desafios para alcançar seus objetivos!</p>
            </header>
            <main className="w-full max-w-3xl space-y-6">
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Caminhada no Parque</CardTitle>
                        <p className="text-sm">Data: 15 de Novembro, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Junte-se a nós para uma caminhada ao ar livre no parque central. Traga água e disposição para se exercitar ao ar livre com a comunidade!
                        </p>
                        <Button className="mt-4" onClick={() => handleClick('caminhada no parque')}>Participar</Button>
                    </CardContent>
                </Card>
                <Card className="p-4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Desafio de Corrida</CardTitle>
                        <p className="text-sm">Data: 20 de Novembro, 2024</p>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Participe de nosso desafio de corrida de 5 km! Todos os níveis de condicionamento físico são bem-vindos.
                        </p>
                        <Button className="mt-4" onClick={() => handleClick('desafio de corrida')}>Participar</Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
