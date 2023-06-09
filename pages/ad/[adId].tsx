import Image from 'next/image'
import { config } from '../../utils/config'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import type { GetServerSidePropsResult } from 'next'

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
        <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
          <p className='p-10 bg-slate-500'>
            Erreur dans la récupération de l&apos;annonce de l&apos;utilisateur
            <Link href={'/'}>
              <a className='underline block'>
                cliquer ici pour revenir à l&apos;acceuil
              </a>
            </Link>
          </p>
        </div>
      )}
    </>
  )
}
