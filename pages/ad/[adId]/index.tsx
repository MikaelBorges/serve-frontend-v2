import Image from 'next/image'
import { config } from '../../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import type { GetServerSidePropsResult } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export async function getServerSideProps({
  params
}): Promise<GetServerSidePropsResult<unknown>> {
  const data = await fetch(`${config.api_url}/retrieveAd/${params.adId}`).then(
    (r) => r.json()
  )
  if (!data) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      adFetched: data
    }
  }
}

export default function AdPage({ adFetched }): JSX.Element {
  const router = useRouter()
  const adIdRoute = router.query.adId

  const { data, isLoading, isError } = useQuery(
    ['ad', adIdRoute],
    () => {
      return axios(`${config.api_url}/retrieveAd/${adIdRoute}`) as any
    },
    {
      initialData: {
        data: adFetched
      }
    }
  )

  const { ad } = data.data

  return (
    <>
      {isError ? (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            L&apos;annonce de l&apos;utilisateur vient d&apos;être supprimée
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <h1>{isLoading ? 'Chargement...' : ad.title}</h1>
          {ad.imagesWork?.map((imageWork, index) => (
            <Image
              key={index}
              src={imageWork}
              alt={ad.title}
              width={400}
              height={400}
            />
          ))}
        </>
      )}
    </>
  )
}
