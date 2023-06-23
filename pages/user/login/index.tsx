import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useContext, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { config } from '../../../utils/config'
import { MessageCreateAccountType } from '../types'
import { UserContext } from '../../../contexts/userContext/userContext'
import { useRouter } from 'next/router'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  email: z.string().min(6, {
    message: 'Email must be at least 6 characters.'
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 3 characters.'
  })
})

export default function LoginPage() {
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
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setApiResponseMessage(null)
    setIsLoading(true)

    fetch(`${config.api_url}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => {
        //console.log('response', response)
        if (response.ok) return response.json()
        else {
          setApiResponseMessage({
            text: 'Email ou mot de passe incorrect',
            statusIsSuccess: false
          })
        }
      })
      .then((json) => {
        //console.log('json', json)
        if (json) {
          const { token } = json
          const { _id, firstname, imageUser, initials } = json.session.user
          userCtx.setUser({ _id, firstname, token, imageUser, initials })
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl onChange={() => handleRemoveApiMessage()}>
                <Input type='email' placeholder='exemple@email.com' {...field} />
              </FormControl>
              <FormDescription>Entrez votre email</FormDescription>
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
                <Input type='password' {...field} />
              </FormControl>
              <FormDescription>Choisissez un mot de passe</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size='lg' disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='submit'>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Connexion en cours
            </>
          ) : (
            <>Se connecter</>
          )}
        </Button>
      </form>
      {apiResponseMessage && (
        <p className={`mt-8 ${apiResponseMessage.statusIsSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {apiResponseMessage.text}
        </p>
      )}
      <DevTool control={form.control} />
    </Form>
  )
}
