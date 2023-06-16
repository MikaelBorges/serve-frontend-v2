import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { moneyIcon, starIcon, heartIcon } from '@/assets/icons/icons'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/router'
import { UserContext } from '../../contexts/userContext/userContext'
import { useContext, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import axios from 'axios'
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

export default function CardAd({
  title,
  _id,
  userId,
  imagesWork,
  imageUser,
  description,
  price,
  starsNb,
  favoritesNb,
  location,
  levelUser,
  initials
}) {
  const [dataForDeletion, setDataForDeletion] = useState({})
  const userCtx = useContext(UserContext)
  const userContextId = userCtx.user?._id
  const router = useRouter()
  const userIdRoute = router.query.userId

  const handleClickDeleteAd = (adId) => {
    setDataForDeletion({ userId: userContextId, adId })
  }

  const handleDeleteAd = async () => {
    await axios.post(`${config.api_url}/deleteAd`, dataForDeletion)
  }

  const displayStars = (starsNb) => {
    let stringOfStars = ''
    while (starsNb) {
      stringOfStars += starIcon
      --starsNb
    }
    return stringOfStars
  }

  return (
    <li
      className={
        userIdRoute === userContextId
          ? 'p-2 border-slate-400 rounded-3xl border-dashed border-2 mb-6 last:mb-3'
          : '[&:not(:last-child)]:mb-6'
      }
    >
      {userIdRoute === userContextId && (
        <div className='flex mb-2'>
          <AlertDialog>
            <AlertDialogTrigger
              onClick={() => handleClickDeleteAd(_id)}
              className='bg-red-500 text-white rounded-full px-1.5 mr-2'
            >
              <HiOutlineTrash />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Etes-vous sûr(e) ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Attention, cette action n&apos;est pas réversible. Cela
                  supprimera définitivement votre annonce et supprimera ses
                  données de nos serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={buttonVariants({ variant: 'default' })}
                >
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({ variant: 'destructive' })}
                  onClick={() => handleDeleteAd()}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href={`/ad/${_id}/edit`}>
            <a className='inline-flex items-center justify-center bg-black text-white dark:bg-slate-200 dark:text-black rounded-full h-7 py-1 px-3 [&:not(:last-child)]:mr-1'>
              modifier
            </a>
          </Link>
        </div>
      )}
      <Card className='rounded-3xl border-0 flex overflow-hidden'>
        {Boolean(imagesWork.length) && (
          <div className='min-w-[9rem] w-36'>
            <Image src={imagesWork[0]} alt={title} width={144} height={144} />
          </div>
        )}
        <div className='p-2 w-full flex flex-col'>
          <div className='flex h-full flex-col'>
            <div className='flex'>
              <Link href={`/ad/${_id}`}>
                <a className='w-full'>
                  <CardHeader className='p-0'>
                    <CardTitle className='font-normal'>{title}</CardTitle>
                    <CardContent className='p-0 flex justify-between'>
                      <CardDescription className='text-xs'>
                        {location}
                      </CardDescription>
                    </CardContent>
                  </CardHeader>
                </a>
              </Link>
              <Link href={`/user/${userId}`}>
                <a className='flex flex-col items-center'>
                  <Avatar>
                    <AvatarImage src={imageUser} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  {levelUser && (
                    <Badge
                      variant={levelUser === 'Gold' ? 'gold' : 'ultra'}
                      className='text-[0.5rem] py-[0.05rem] px-1 mt-1 font-normal'
                    >
                      {levelUser}
                    </Badge>
                  )}
                </a>
              </Link>
            </div>
            <Link href={`/ad/${_id}`}>
              <a className='h-full'>
                <p className='dark:text-white leading-4'>{description}</p>
              </a>
            </Link>
          </div>
          <CardFooter className='flex p-0'>
            <Link href={`ad/${_id}`}>
              <a className='w-full'>
                {starsNb && (
                  <p className='text-[0.5rem]'>{displayStars(starsNb)}</p>
                )}
                <p className='text-xs dark:text-yellow-100 text-fuchsia-500'>
                  {moneyIcon} {price} €/h
                </p>
              </a>
            </Link>
            <Button className='min-w-fit' variant='buttonCard'>
              {favoritesNb} {heartIcon}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </li>
  )
}
