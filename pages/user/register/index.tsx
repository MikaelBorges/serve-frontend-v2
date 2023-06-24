import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { config } from '../../../utils/config'
import { UserContext } from '../../../contexts/userContext/userContext'
import { useRouter } from 'next/router'
import { MessageCreateAccountType } from '../types'
import { Loader2 } from 'lucide-react'
import { formSchema } from '../schemas/registerOrModifyUserSchema'

export default function RegisterPage() {
  const [apiResponseMessage, setApiResponseMessage] = useState<MessageCreateAccountType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const userCtx = useContext(UserContext)
  const router = useRouter()
  const userIsLogged = userCtx.user?.token

  if (userIsLogged) router.push('/')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setApiResponseMessage(null)
    setIsLoading(true)

    fetch(`${config.api_url}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => {
        //console.log('response', response)
        if (response.ok) {
          setApiResponseMessage({
            text: 'Votre compte a bien été créé',
            statusIsSuccess: true
          })
        } else {
          setApiResponseMessage({
            text: "Erreur, votre compte n'a pas été créé",
            statusIsSuccess: false
          })
        }
      })
      .catch((error) => console.log(`Erreur : ${error}`))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleRemoveApiMessage = () => {
    if (!apiResponseMessage?.statusIsSuccess) setApiResponseMessage(null)
  }

  return (
    <section className='p-3'>
      <h1 className='text-3xl mb-6'>Créér mon compte</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    type='email'
                    placeholder='exemple@email.com'
                    {...field}
                  />
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='password' {...field} />
                </FormControl>
                <FormDescription>Choisissez un mot de passe minimum 3 caractères</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='firstname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    type='text'
                    placeholder='John'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    type='text'
                    placeholder='Doe'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléhone</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    type='tel'
                    placeholder='06 07 08 09 10'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Si c&apos;est un numéro étranger, utilisez le préfixe international</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size='lg' disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='submit'>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Création en cours
              </>
            ) : (
              <>Créér mon compte</>
            )}
          </Button>
        </form>
        {apiResponseMessage && (
          <p className={`mt-8 ${apiResponseMessage.statusIsSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {apiResponseMessage.text}
          </p>
        )}
      </Form>
    </section>
  )
}
