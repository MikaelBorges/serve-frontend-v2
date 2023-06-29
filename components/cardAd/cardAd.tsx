import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { moneyIcon, starIcon, heartIcon } from '@/assets/icons/icons'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/router'
import { UserContext } from '../../contexts/userContext/userContext'
import { useContext, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { config } from '../../utils/config'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { AdsType } from '../../types'
import { HiLocationMarker } from 'react-icons/hi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type CardAdsProps = {
  ad: AdsType
}

export function CardAd({ ad }: CardAdsProps) {
  const [dataForDeletion, setDataForDeletion] = useState({})
  const userCtx = useContext(UserContext)
  const userContextId = userCtx.user?._id
  const router = useRouter()
  const userIdInRoute = router.query.userId
  const queryClient = useQueryClient()

  const handleDeleteAd = (adId: AdsType['_id']) => setDataForDeletion({ userId: userContextId, adId })

  const mutation = useMutation({
    mutationFn: (dataForDeletion) =>
      fetch(`${config.api_url}/deleteAd`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataForDeletion)
      }).then((res) => res.json()),
    onSuccess: () => queryClient.invalidateQueries(['userAds', userIdInRoute])
  })

  const deleteAd = () => mutation.mutate(dataForDeletion)

  /* const deleteAd = async () => {
    fetch(`${config.api_url}/deleteAd`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataForDeletion)
    })
      .then((response) => {
        if (response.ok) console.log('Votre annonce a bien été supprimée + refaire un useQuery')
        else console.log("Erreur : annonce non supprimée car elle n'existe pas")
        //return response.json()
      })
      // .then((json) => {
      //  console.log('json', json)
      //})
      .catch((error) => {
        console.log(`Erreur : ${error}`)
      })
  } */

  const displayStars = (starsNb: AdsType['starsNb']) => {
    let stringOfStars = ''
    while (starsNb) {
      stringOfStars += starIcon
      --starsNb
    }
    return stringOfStars
  }

  return (
    <li
      className={`[&:not(:last-child)]:mb-6
        ${userIdInRoute === userContextId ? 'p-2 border-slate-400 rounded-3xl border-dashed border-2' : ''}
          `}
    >
      {userIdInRoute === userContextId && (
        <div className='flex mb-2 justify-end'>
          <AlertDialog>
            <AlertDialogTrigger
              onClick={() => handleDeleteAd(ad._id)}
              className='bg-red-500 text-white rounded-full px-1.5 mr-2'
            >
              <HiOutlineTrash />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Etes-vous sûr(e) ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Attention cette action est irréversible. Cela supprimera définitivement votre annonce et supprimera
                  ses données de nos serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={buttonVariants({ variant: 'default' })}>Annuler</AlertDialogCancel>
                <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={() => deleteAd()}>
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href={`/ad/${ad._id}/edit`}>
            <a className='inline-flex items-center justify-center bg-black text-white dark:bg-slate-200 dark:text-black rounded-full h-7 py-1 px-3 [&:not(:last-child)]:mr-1'>
              modifier
            </a>
          </Link>
        </div>
      )}
      <Card className='rounded-3xl border-0 flex overflow-hidden'>
        {Boolean(ad.imagesWork.length) && (
          <div className='min-w-[9rem] w-36'>
            <Image src={ad.imagesWork[0]} alt={ad.title} width={144} height={144} />
          </div>
        )}
        <div className='p-2 w-full flex flex-col'>
          <div className='flex h-full flex-col'>
            <div className='flex'>
              <Link href={`/ad/${ad._id}`}>
                <a className='w-full'>
                  <CardHeader className='p-0'>
                    <CardTitle className='font-normal'>{ad.title}</CardTitle>
                    <CardContent className='p-0 flex justify-between'>
                      <CardDescription className='text-xs flex items-center text-red-500'>
                        <HiLocationMarker className='mr-1' />
                        {ad.location}
                      </CardDescription>
                    </CardContent>
                  </CardHeader>
                </a>
              </Link>
              <Link href={`/user/${ad.userId}`}>
                <a className='flex flex-col items-center'>
                  <Avatar>
                    <AvatarImage src={ad.imageUser} />
                    <AvatarFallback>{ad.initials}</AvatarFallback>
                  </Avatar>
                  {ad.levelUser && (
                    <Badge
                      variant={ad.levelUser === 'Gold' ? 'gold' : 'ultra'}
                      className='text-[0.5rem] py-[0.05rem] px-1 mt-1 font-normal'
                    >
                      {ad.levelUser}
                    </Badge>
                  )}
                </a>
              </Link>
            </div>
            <Link href={`/ad/${ad._id}`}>
              <a className='h-full flex items-center'>
                <p className='dark:text-white leading-4'>{ad.description}</p>
              </a>
            </Link>
          </div>
          <CardFooter className='flex p-0'>
            <Link href={`/ad/${ad._id}`}>
              <a className='w-full'>
                {ad.starsNb && <p className='text-[0.5rem]'>{displayStars(ad.starsNb)}</p>}
                <p className='text-xs dark:text-yellow-100 text-fuchsia-500'>
                  {moneyIcon} {ad.price} €/h
                </p>
              </a>
            </Link>
            {/* <Button className='min-w-fit' variant='buttonCard'>
              {ad.favoritesNb} {heartIcon}
            </Button> */}
          </CardFooter>
        </div>
      </Card>
    </li>
  )
}
