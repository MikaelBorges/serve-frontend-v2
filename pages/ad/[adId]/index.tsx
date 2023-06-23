import Image from 'next/image'
import { config } from '../../../utils/config'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { AdsType } from '@/types'

type UserInfo = {
  imageUser: string
  levelUser: string
  starsNb: number
  phone: string
  firstname: string
}

type UserAd = {
  user: UserInfo
  ad: AdsType
}

type Props = {
  userAd: UserAd
}

type Params = {
  adId: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const data: UserAd = await fetch(`${config.api_url}/retrieveAd/${params?.adId}`).then((r) => r.json())
  if (!data) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      userAd: data
    }
  }
}

export default function AdPage({ userAd }: Props) {
  const router = useRouter()
  const adIdInRoute = router.query.adId

  const { data, isLoading, isError } = useQuery<UserAd>(
    ['ad', adIdInRoute],
    () => {
      return fetch(`${config.api_url}/retrieveAd/${adIdInRoute}`).then((r) => r.json())
    },
    {
      initialData: userAd
    }
  )

  console.log('data', data)

  return (
    <>
      {isError ? (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>L&apos;annonce de l&apos;utilisateur vient d&apos;être supprimée</AlertDescription>
        </Alert>
      ) : (
        <>
          <h1>{isLoading ? 'Chargement...' : data.ad.title}</h1>
          {data.ad.imagesWork?.map((imageWork, index) => (
            <Image key={index} src={imageWork} alt={data.ad.title} width={400} height={400} />
          ))}
        </>
      )}
    </>
  )
}
