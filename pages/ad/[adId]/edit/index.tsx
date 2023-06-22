import { AdForm } from '../../../../components/adForm/adForm'
import { SubmitHandler } from 'react-hook-form'
import { AdFormType } from '../../../../components/adForm/types'
import { useState } from 'react'
import { MessageCreateAdType } from '../../types'
import { config } from '../../../../utils/config'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { AdsType } from '@/types'

type Props = {
  ad: AdsType
}

type Params = {
  adId: string
}

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

  // useMutation
  const submit: SubmitHandler<AdFormType> = async (data) => {
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
  }

  return (
    <>
      <h1>Editer Annonce</h1>

      <AdForm
        defaultValues={ad}
        isLoading={isLoading}
        disabled={Boolean(apiResponseMessage?.statusIsSuccess)}
        onSubmit={submit}
      />

      {apiResponseMessage && (
        <p className={apiResponseMessage.statusIsSuccess ? 'text-green-500' : 'text-red-500'}>
          {apiResponseMessage.text}
        </p>
      )}
    </>
  )
}
