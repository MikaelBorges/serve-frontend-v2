import { useContext, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../../components/input/input'
import { config } from '../../utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DevTool } from '@hookform/devtools'
import { UserContext } from '../../contexts/userContext/userContext'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import loader from '../../assets/images/loader/y3Hm3.gif'
import { newAdFields } from '../../data/fields/newAdFields'
import { seconds } from '../../utils/seconds'

type NewAdFormType = {
  title: string
  description: string
  location: string
  price: string
}

type MessageCreateAdType = {
  text: string
  statusIsSuccess: boolean
}

export default function NewAdPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] =
    useState<MessageCreateAdType | null>(null)

  // Note > Si on passe par le contexte, j'ai l'erreur : Error: No router instance found
  if (typeof window !== 'undefined') {
    const userStorageDirty = localStorage.getItem('userStorage')
    const userStorage = JSON.parse(userStorageDirty)
    if (!userStorage.token) router.push('/')
  }

  const generateErrorMessageValue = (name: string) => {
    switch (name) {
      case 'title':
        return errors.title?.message
      case 'description':
        return errors.description?.message
      case 'location':
        return errors.location?.message
      case 'price':
        return errors.price?.message
      default:
        return undefined
    }
  }

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<NewAdFormType>()

  const onSubmit: SubmitHandler<NewAdFormType> = async (data) => {
    setApiResponseMessage(null)
    setIsLoading(true)
    console.log('data', data)
    //await seconds(2)

    const response = {
      status: 200
    }
    if (response.status === 200) {
      setApiResponseMessage({
        text: 'Votre annonce a bien créée',
        statusIsSuccess: true
      })
    } else {
      setApiResponseMessage({
        text: "Erreur, votre annonce n'a pas été créée",
        statusIsSuccess: false
      })
    }
    setIsLoading(false)
  }

  return (
    <>
      <h1 className='text-3xl'>Nouvelle annonce</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        {newAdFields.map(({ type, name, title, value, message }: any) => (
          <Input
            key={name}
            type={type}
            name={name}
            title={title}
            register={{
              ...register(name, {
                required: true,
                pattern: {
                  value,
                  message
                }
              })
            }}
            errorMessage={generateErrorMessageValue(name)}
          />
        ))}
        <button
          className='flex items-center mx-auto'
          type='submit'
          disabled={isLoading || apiResponseMessage?.statusIsSuccess}
        >
          {isLoading ? "En cours d'envoi" : 'Envoyer'}
          {isLoading && (
            <Image src={loader} alt='loader' width={20} height={20} />
          )}
        </button>
      </form>
      {apiResponseMessage && (
        <p
          className={
            apiResponseMessage.statusIsSuccess
              ? 'text-green-500'
              : 'text-red-500'
          }
        >
          {apiResponseMessage.text}
        </p>
      )}
      <DevTool control={control} />
    </>
  )
}
