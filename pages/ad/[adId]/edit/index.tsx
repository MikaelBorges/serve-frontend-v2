import { UserContext } from '../../../../contexts/userContext/userContext'
import AdForm from '../../../../components/adForm/adForm'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewAdFormType } from '../../../../components/adForm/types'
import { newAdFields } from '../../../../data/fields/newAdFields'
import Input from '../../../../components/input/input'
import Image from 'next/image'
import loader from '../../../../assets/images/loader/y3Hm3.gif'
import { useContext, useState, useEffect } from 'react'
import { MessageCreateAdType } from '../../types'
import { OverlayContext } from '../../../../contexts/overlayContext/overlayContext'
import axios from 'axios'
import { config } from '../../../../utils/config'
import { DevTool } from '@hookform/devtools'
import Overlay from '../../../../layout/overlay/overlay'
import { useRouter } from 'next/router'

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(
    `${config.api_url}/retrieveAd/${params.adId}`
  ).then((r) => r.json())
  const { title, description, location, price } = response.ad
  const defaultValues = {
    title,
    description,
    location,
    price
  }

  return {
    props: {
      defaultValues
    }
  }
}

export default function EditAd({ defaultValues }): JSX.Element {
  const router = useRouter()
  const { adId } = router.query
  const userCtx = useContext(UserContext)
  const overlayCtx = useContext(OverlayContext)
  const [apiResponseMessage, setApiResponseMessage] =
    useState<MessageCreateAdType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
  } = useForm<NewAdFormType>({ defaultValues })

  const onSubmit: SubmitHandler<NewAdFormType> = async (data) => {
    const response = await axios.post(
      `${config.api_url}/modifyAd/${adId}`,
      data
    )
    if (response.status === 200) {
      overlayCtx.setOverlay(true)
    } else {
      setApiResponseMessage({
        text: "Erreur, votre annonce n'a pas été modifiée",
        statusIsSuccess: false
      })
    }
    setIsLoading(false)
  }

  return (
    <>
      <h1>Editer Annonce</h1>
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
            text: 'Votre annonce a bien été modifiée',
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
