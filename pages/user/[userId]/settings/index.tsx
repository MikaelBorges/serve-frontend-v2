import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { config } from '../../../../utils/config'
import { MessageCreateAccountType } from '../../types'
import { Loader2 } from 'lucide-react'
import { UserContext } from '../../../../contexts/userContext/userContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'

const formSchema = z.object({
  email: z.string().min(6, {
    message: 'Email must be at least 6 characters.'
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 3 characters.'
  }),
  firstname: z.string().min(2, {
    message: 'Firstname must be at least 2 characters.'
  }),
  lastname: z.string().min(2, {
    message: 'Lastname must be at least 2 characters.'
  }),
  phone: z.string().min(10, {
    message: 'Phone must be at least 10 numbers.'
  })
})

type UserInfo = {
  imageUser: string
  lastname: string
  email: string
  phone: string
  firstname: string
}

type Props = {
  userInfo: UserInfo
}

type Params = {
  userId: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const response = await fetch(`${config.api_url}/retrieveUser/${params?.userId}`).then((r) => r.json())
  if (!response) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      userInfo: response.userInfo
    }
  }
}

export default function UserSettingsPage({ userInfo }: Props) {
  const [apiResponseMessage, setApiResponseMessage] = useState<MessageCreateAccountType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const userCtx = useContext(UserContext)
  const userId = userCtx.user?._id

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userInfo.email,
      password: '',
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      phone: userInfo.phone
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setApiResponseMessage(null)
    setIsLoading(true)

    //console.log('userId', userId)

    fetch(`${config.api_url}/user/changeUserData/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((response) => {
        //console.log('response', response)
        if (response.ok) {
          setApiResponseMessage({
            text: 'Votre compte a bien été modifié',
            statusIsSuccess: true
          })
        } else {
          setApiResponseMessage({
            text: "Erreur, votre compte n'a pas été modifié",
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

  useEffect(() => {
    const userStorageDirty = localStorage.getItem('userStorage')
    const userStorage = userStorageDirty ? JSON.parse(userStorageDirty) : null
    if (!userStorage.token) router.push('/')
  }, [router])

  return (
    <>
      <h1 className='text-3xl mb-6'>Modifier mon compte</h1>
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
                  <Input disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='password' {...field} />
                </FormControl>
                <FormDescription>Choisissez un mot de passe</FormDescription>
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
                <FormDescription>Entrez votre prénom</FormDescription>
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
                <FormDescription>Entrez votre nom</FormDescription>
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
                <FormDescription>Entrez votre numéro de téléphone</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size='lg' disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='submit'>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Modification en cours
              </>
            ) : (
              <>Modifier</>
            )}
          </Button>
        </form>
      </Form>
      {apiResponseMessage && (
        <p className={`mt-8 ${apiResponseMessage.statusIsSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {apiResponseMessage.text}
        </p>
      )}
      <DevTool control={form.control} />
    </>
  )
}
