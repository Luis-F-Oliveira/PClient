import Link from 'next/link'

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-background sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-red-600">403</h1>
        <p className="mt-2 text-base text-primary">
          Acesso negado. Você não tem permissão para acessar esta página.
        </p>
        <div className="mt-6">
          <Link href="/" className="text-indigo-600 hover:text-indigo-500">
              Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
