'use client'

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/auth'
import { Checkbox } from '@/components/ui/checkbox'

const schema = z.object({
  email: z.string({
    required_error: "O email deve ser preenchido"
  }).email({
    message: 'Insira um endereço de email válido'
  }).max(255, {
    message: 'O valor máximo de caracteres para o campo é de 255'
  }),
  password: z.string({
    required_error: "A senha deve ser preenchida"
  }).min(8, {
    message: 'A senha deve ter no mínimo 8 caracteres'
  }).max(255, {
    message: 'O valor máximo de caracteres para o campo é de 255'
  }),
  remember: z.boolean().default(false)
})

type IForm = z.infer<typeof schema>

export default function Page() {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/'
  })

  const form = useForm<IForm>({
    resolver: zodResolver(schema)
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    await login(values)
  }

  return (
    <Card className='w-1/4'>
      <CardHeader className='text-center'>
        <CardTitle>Acessar</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Lembre de mim
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div>
              <Button
                className={cn(isSubmitting ? 'cursor-no-drop' : 'cursor-pointer')}
                disabled={isSubmitting}
                type='submit'
              >
                Entrar
              </Button>
              <Button type='button' variant='link'>
                <Link href='/auth/register'>
                  Não possuo registro
                </Link>
              </Button>
              <Button type='button' variant='link'>
                <Link href='/auth/forgot-password'>
                  Esqueci minha senha
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
