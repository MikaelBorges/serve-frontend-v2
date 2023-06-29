import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { UserContext } from '../../contexts/userContext/userContext'
import { config } from '../../utils/config'
import { MessageCreateAdType } from './types'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { DevTool } from '@hookform/devtools'
import { Textarea } from '@/components/ui/textarea'
import { formSchema } from './schema/adSchema'
import { MotionLabel } from '@/components/motionLabel/motionLabel'
import { useToast } from '@/components/ui/use-toast'

export default function NewAdPage() {
  const { toast } = useToast()
  const userCtx = useContext(UserContext)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] = useState<MessageCreateAdType | null>(null)
  const [focusTitle, setFocusTitle] = useState(false)
  const [focusDescription, setFocusDescription] = useState(false)
  const [focusLocation, setFocusLocation] = useState(false)
  const [focusPrice, setFocusPrice] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setApiResponseMessage(null)
      setIsLoading(true)

      const response = await fetch(`${config.api_url}/user/ad/${userCtx.user?._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        setApiResponseMessage({
          text: 'Votre annonce a bien été créée',
          statusIsSuccess: true
        })
        toast({
          variant: 'success',
          title: 'Annonce envoyée',
          description: 'Votre annonce a bien été créée'
        })
      } else {
        setApiResponseMessage({
          text: "Erreur, votre annonce n'a pas été créée",
          statusIsSuccess: false
        })
        toast({
          variant: 'destructive',
          title: 'Il y a eu un problème',
          description: "Votre annonce n'a pas été envoyée"
        })
      }
    } catch (error) {
      setApiResponseMessage({
        text: `Erreur : ${error}`,
        statusIsSuccess: false
      })
      toast({
        variant: 'destructive',
        title: 'Il y a eu un problème',
        description: "Votre annonce n'a pas été envoyée"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveApiMessage = () => {
    if (!apiResponseMessage?.statusIsSuccess) setApiResponseMessage(null)
  }

  useEffect(() => {
    const userStorageDirty = localStorage.getItem('userStorage')
    const userStorage = userStorageDirty ? JSON.parse(userStorageDirty) : null
    if (!userStorage?.token) router.push('/')
  }, [router])

  return (
    <section className='p-3'>
      <h1 className='text-3xl mb-6'>Ajouter une annonce</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <MotionLabel name='Titre' focus={focusTitle} />
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input
                    onFocus={() => setFocusTitle(true)}
                    id='Titre'
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    type='text'
                    {...field}
                  />
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
                <MotionLabel name='Description' focus={focusDescription} />
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Textarea
                    onFocus={() => setFocusDescription(true)}
                    id='Description'
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    {...field}
                  />
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
                <MotionLabel name='Ville' focus={focusLocation} />
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input
                    onFocus={() => setFocusLocation(true)}
                    id='Ville'
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    type='text'
                    {...field}
                  />
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
                <MotionLabel name='Prix' focus={focusPrice} />
                <FormControl onChange={() => handleRemoveApiMessage()}>
                  <Input
                    onFocus={() => setFocusPrice(true)}
                    id='Prix'
                    disabled={isLoading || apiResponseMessage?.statusIsSuccess}
                    type='number'
                    {...field}
                  />
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
                Création en cours
              </>
            ) : (
              <>Créér mon annonce</>
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
    </section>
  )
}
