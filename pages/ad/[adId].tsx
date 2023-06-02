import Image from 'next/image'
import { config } from '../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export default function AdPage({ adFetched }) {
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
      <h1>
        {isError
          ? "Erreur dans la récupération de l'annonce de l'utilisateur"
          : isLoading
          ? 'Chargement...'
          : ad.title}
      </h1>
    </>
  )
}

export async function getServerSideProps({ params }) {
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
