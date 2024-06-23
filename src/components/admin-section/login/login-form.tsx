'use client'

import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  username: z.string().min(3, 'Uživatelské jméno je povinné.'),
  password: z.string().min(5, 'Heslo je povinné.'),
})

export type FormInputs = z.infer<typeof formSchema>

export const LoginForm = () => {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data, e) => {
    e?.preventDefault()

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log(error)
    }

    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="relative">
              <Input
                id="username-input"
                placeholder="Přihlašovaní jméno"
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="relative">
              <Input
                id="password-input"
                type="password"
                placeholder="Heslo"
                {...field}
              />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Přihlásit se
        </Button>
      </form>
    </Form>
  )
}
