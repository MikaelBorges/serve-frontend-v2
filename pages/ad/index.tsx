import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../../components/input/input'
import { useRouter } from 'next/router'
import { DevTool } from '@hookform/devtools'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import loader from '../../assets/images/loader/y3Hm3.gif'
import { newAdFields } from '../../data/fields/newAdFields'
import { seconds } from '../../utils/seconds'
import { OverlayContext } from '../../contexts/overlayContext/overlayContext'
import { UserContext } from '../../contexts/userContext/userContext'
import Overlay from '../../layout/overlay/overlay'
import axios from 'axios'
import { config } from '../../utils/config'
import AdForm from '../../components/adForm/adForm'
import { NewAdFormType } from '../../components/adForm/types'
import { MessageCreateAdType } from './types'

export default function NewAdPage() {
  const overlayCtx = useContext(OverlayContext)
  const userCtx = useContext(UserContext)
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
    //await seconds(2)

    const response = await axios.post(
      `${config.api_url}/user/ad/${userCtx.user?._id}`,
      data
    )

    if (response.status === 200) {
      overlayCtx.setOverlay(true)
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
      <AdForm handleSubmit={handleSubmit} onSubmit={onSubmit}>
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
          disabled={
            isLoading ||
            apiResponseMessage?.statusIsSuccess ||
            overlayCtx.overlay
          }
        >
          {isLoading ? "En cours d'envoi" : 'Envoyer'}
          {isLoading && (
            <Image src={loader} alt='loader' width={20} height={20} />
          )}
        </button>
      </AdForm>
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
      {overlayCtx.overlay && (
        <Overlay
          message={{
            text: 'Votre annonce a bien été créée',
            color: 'text-green-500'
          }}
          link={{
            text: 'cliquez ici pour voir vos annonces',
            url: `/user/${userCtx.user?._id}`
          }}
        />
      )}
      <DevTool control={control} />
    </>
  )
}
