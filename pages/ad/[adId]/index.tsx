import Image from 'next/image'
import { config } from '../../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import type { GetServerSidePropsResult } from 'next'
import Overlay from '../../../layout/overlay/overlay'

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
      {ad.imagesWork?.map((imageWork, index) => (
        <Image
          key={index}
          src={imageWork}
          alt={ad.title}
          width={400}
          height={400}
        />
      ))}
      <h1>{isLoading ? 'Chargement...' : ad.title}</h1>
      {isError && (
        <Overlay
          message={{
            text: "Erreur l'annonce de l'utilisateur vient d'être supprimée",
            color: 'text-red-500'
          }}
          link={{
            text: "cliquez ici pour revenir à la page d'accueil",
            url: '/'
          }}
        />
      )}
    </>
  )
}
