import Image from 'next/image'
import { config } from '../../../utils/config'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { AdsType } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { moneyIcon, starIcon, heartIcon, smartphoneIcon } from '@/assets/icons/icons'
import { HiLocationMarker } from 'react-icons/hi'

type UserInfo = {
  imageUser: string
  levelUser: string
  starsNb: number
  phone: string
  firstname: string
  initials: string
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

  const { data, isError } = useQuery<UserAd>(
    ['ad', adIdInRoute],
    () => {
      return fetch(`${config.api_url}/retrieveAd/${adIdInRoute}`).then((r) => r.json())
    },
    {
      initialData: userAd
    }
  )

  const displayStars = (starsNb: AdsType['starsNb']) => {
    let stringOfStars = ''
    while (starsNb) {
      stringOfStars += starIcon
      --starsNb
    }
    return stringOfStars
  }

  return (
    <section>
      {isError ? (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>L&apos;annonce de l&apos;utilisateur vient d&apos;être supprimée</AlertDescription>
        </Alert>
      ) : (
        <>
          {Boolean(data.ad.imagesWork.length) && (
            <div className='flex'>
              <Image src={data.ad.imagesWork[0]} alt={data.ad.title} width={1400} height={1400} />
            </div>
          )}
          <div className='p-3'>
            <div className='flex justify-between mb-2'>
              <Avatar>
                <AvatarImage src={data.user.imageUser} />
                <AvatarFallback>{data.user.initials}</AvatarFallback>
              </Avatar>
              {/* <Button size='lg' className='min-w-fit' variant='buttonCard'>
                {data.ad.favoritesNb} {heartIcon}
              </Button> */}
            </div>
            <p className='mb-2 text-sm'>Annonce mise en ligne le {data.ad.dateOfPublication}</p>
            <h1 className='text-3xl'>{data.ad.title}</h1>
            <p className='text-xl text-red-500 flex items-center'>
              <HiLocationMarker className='mr-1' />
              {data.ad.location}
            </p>
            <p className='text-2xl text-fuchsia-500 dark:text-yellow-100'>
              {moneyIcon} {data.ad.price} €/h
            </p>
            <p className='mb-4'>{displayStars(data.user.starsNb)}</p>
            <p className='mb-4'>{data.ad.description}</p>
            <p>Contacter {data.user.firstname} au :</p>
            <a
              href={`tel:${data.user.phone}`}
              className='px-2 py-1 flex w-fit bg-slate-100 items-center rounded-full dark:bg-[#454D56]'
            >
              <span className='mr-1'>{smartphoneIcon}</span>
              {data.user.phone}
            </a>
          </div>
        </>
      )}
    </section>
  )
}
