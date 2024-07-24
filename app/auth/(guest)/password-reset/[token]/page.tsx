'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
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
import { useAuth } from '@/hooks/auth'

const schema = z
  .object({
    email: z.string().email(),
    password: z.string({
      required_error: "A senha deve ser preenchida"
    }).min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres'
    }).max(255, {
      message: 'O valor máximo de caracteres para o campo é de 255'
    }),
    password_confirmation: z.string({
      required_error: "Confirmar senha deve ser preenchido"
    }).min(8, {
      message: 'Confirmar senha deve ter no mínimo 8 caracteres'
    }).max(255, {
      message: 'O valor máximo de caracteres para o campo é de 255'
    })
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas devem ser iguais',
    path: ["password_confirmation"]
  })

type IForm = z.infer<typeof schema>

export default function Page() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const { resetPassword } = useAuth({
    middleware: 'guest'
  })

  const form = useForm<IForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email ? email : '',
      password: '',
      password_confirmation: ''
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: IForm) => {
    await resetPassword(values)
  }

  return (
    <Card className='w-1/4'>
      <CardHeader className='text-center'>
        <CardTitle>Recuperar senha</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password_confirmation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isSubmitting}>
              Alterar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
