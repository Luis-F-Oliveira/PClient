import React from 'react'

export default function Page() {
    return (
        <div className='mt-5'>
            <div className="p-6 text-center">
                <h1 className="text-3xl font-bold">Dicas Diárias de Saúde e Bem-Estar</h1>
                <p className="mt-2">Melhore sua qualidade de vida com pequenas mudanças diárias.</p>
            </div>
            <div className="p-6 md:p-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <section className="bg-secondary shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Nutrição</h2>
                            <ul className="space-y-4">
                                <li className="p-4 rounded-md shadow-sm">
                                    <h3 className="font-bold">Hidrate-se</h3>
                                    <p>Beber água é essencial para manter o corpo hidratado e funcionando corretamente. Tente consumir ao menos 2 litros por dia.</p>
                                </li>
                                <li className="p-4 rounded-md shadow-sm">
                                    <h3 className="font-bold">Consuma mais frutas</h3>
                                    <p>As frutas são ricas em vitaminas e fibras, que ajudam a fortalecer o sistema imunológico.</p>
                                </li>
                            </ul>
                        </section>
                        <section className="bg-secondary shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Exercícios</h2>
                            <ul className="space-y-4">
                                <li className="p-4 rounded-md shadow-sm">
                                    <h3 className="font-bold">Caminhe regularmente</h3>
                                    <p>Andar diariamente melhora a saúde cardiovascular e ajuda a controlar o peso.</p>
                                </li>
                                <li className="p-4 rounded-md shadow-sm">
                                    <h3 className="font-bold">Alongue-se</h3>
                                    <p>Alongamentos ajudam a manter a flexibilidade e a prevenir lesões.</p>
                                </li>
                            </ul>
                        </section>
                        <section className="bg-secondary shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Saúde Mental</h2>
                            <ul className="space-y-4">
                                <li className="p-4 rounded-md shadow-sm">
                                    <h3 className="font-bold">Medite</h3>
                                    <p>Dedique alguns minutos do seu dia para meditar e aliviar o estresse.</p>
                                </li>
                                <li className="p-4 rounded-md shadow-sm">
                                    <h3 className="font-bold">Desconecte-se</h3>
                                    <p>Tire uma pausa das redes sociais para se reconectar consigo mesmo e relaxar.</p>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <div className="text-center p-4 mt-8">
                <p>&copy; 2024 Dicas de Saúde e Bem-Estar</p>
            </div>
        </div>
    )
}
