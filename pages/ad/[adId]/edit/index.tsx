import { useState } from 'react'
import { MessageCreateAdType } from '../../types'
import { config } from '../../../../utils/config'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { AdsType } from '@/types'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { DevTool } from '@hookform/devtools'

type Props = {
  ad: AdsType
}

type Params = {
  adId: string
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.'
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.'
  }),
  price: z.string().min(1, {
    message: 'Price must be at least 1 characters.'
  })
})

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const response = await fetch(`${config.api_url}/retrieveAd/${params?.adId}`).then((r) => r.json())
  if (!response) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      ad: response.ad
    }
  }
}

export default function EditAdPage({ ad }: Props) {
  const router = useRouter()
  const { adId } = router.query
  const [apiResponseMessage, setApiResponseMessage] = useState<MessageCreateAdType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveApiMessage = () => {
    if (!apiResponseMessage?.statusIsSuccess) setApiResponseMessage(null)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ad.title,
      description: ad.description,
      location: ad.location,
      price: ad.price
    }
  })

  // useMutation
  /* const submit: SubmitHandler<AdFormType> = async (data) => {
    fetch(`${config.api_url}/modifyAd/${adId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          setApiResponseMessage({
            text: 'Votre annonce a bien été modifiée',
            statusIsSuccess: true
          })
        } else {
          setApiResponseMessage({
            text: "Erreur : annonce non modifiée car elle n'existe plus",
            statusIsSuccess: false
          })
        }
      })
      .catch((error) => {
        setApiResponseMessage({
          text: `Erreur : ${error}`,
          statusIsSuccess: false
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  } */

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setApiResponseMessage(null)
      setIsLoading(true)

      const response = await fetch(`${config.api_url}/modifyAd/${adId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        setApiResponseMessage({
          text: 'Votre annonce a bien été modifiée',
          statusIsSuccess: true
        })
      } else {
        setApiResponseMessage({
          text: "Erreur, votre annonce n'a pas été modifiée",
          statusIsSuccess: false
        })
      }
    } catch (error) {
      setApiResponseMessage({
        text: `Erreur : ${error}`,
        statusIsSuccess: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className='text-3xl mb-6'>Modifier l&apos;annonce</h1>

      {/* <AdForm
        defaultValues={ad}
        isLoading={isLoading}
        disabled={Boolean(apiResponseMessage?.statusIsSuccess)}
        onSubmit={submit}
      /> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='text' {...field} />
                </FormControl>
                <FormDescription>Choisissez un titre pour votre annonce</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='text' {...field} />
                </FormControl>
                <FormDescription>Décrivez au mieux votre annonce</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='text' {...field} />
                </FormControl>
                <FormDescription>La ville où elle est disponible</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input disabled={isLoading || apiResponseMessage?.statusIsSuccess} type='number' {...field} />
                </FormControl>
                <FormDescription>Le prix de votre annonce</FormDescription>
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
